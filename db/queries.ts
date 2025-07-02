/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { db } from "./drizzle";
import { eq } from "drizzle-orm";
import { courses, userProgress, units, challengeProgress, lessons, userSubscription } from "./schema";

export const getUserProgress = cache(async () => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        },
    });
    return data;
})

export const getUnits = cache(async () => { //trả về các unit thuộc khóa học hiện tại (activeCourse) mà user đang học.

    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCourseId){
        return [];
}
    const data = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    challenges: {
                        orderBy: (challenges, { asc }) => [asc(challenges.order)],
                        with: {
                            challengeProgress: {
                                where: eq(
                                    challengeProgress.userId, 
                                    userId,
                                ),
                            }
                        }
                    }
                }
            }
        }
    })

    const normalizedData = data.map((unit) => {
        const lessonWithCompletedStatus = unit.lessons.map((lesson) => {

            if (lesson.skip || lesson.challenges.length === 0) {
                return { ...lesson, completed: false };
            }

            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                return challenge.challengeProgress &&
                challenge.challengeProgress.length > 0 &&
                challenge.challengeProgress.every((progress) => progress.completed)
            })
            return { ...lesson, completed: allCompletedChallenges };
        })
        return { ...unit, lessons: lessonWithCompletedStatus };
    })
    return normalizedData;
// [
//   {
//     id: 1,
//     courseId: 1,
//     order: 1,
//     title: "Phần 1",
//     description: "Mời khách xơi nước",
//     lessons: [
//       {
//         id: 1,
//         unitId: 1,
//         order: 1,
//         title: "Cửa 1",
//         skip: false,
//         completed: true,
//         challenges: [
//           {
//             id: 1,
//             lessonId: 1,
//             order: 1,
//             type: "SELECT",
//             question: 'Đâu là "trà"?',
//             challengeProgress: [
//               {
//                 userId: "user_123",
//                 challengeId: 1,
//                 completed: true
//               }
//             ]
//           },
//           {
//             id: 2,
//             lessonId: 1,
//             order: 2,
//             type: "ASSIST",
//             question: '"trà"?',
//             challengeProgress: [
//               {
//                 userId: "user_123",
//                 challengeId: 2,
//                 completed: true
//               }
//             ]
//           }
//         ]
//       },
//       {
//         id: 2,
//         unitId: 1,
//         order: 2,
//         title: "Cửa 2",
//         skip: false,
//         completed: false,
//         challenges: [
//           {
//             id: 3,
//             lessonId: 2,
//             order: 1,
//             type: "SELECT",
//             question: 'Đâu là "sữa"?',
//             challengeProgress: [] // user chưa làm gì
//           }
//         ]
//       }
//     ]
//   },
//   {
//     id: 2,
//     courseId: 1,
//     order: 2,
//     title: "Phần 2",
//     description: "Giới thiệu gốc gác",
//     lessons: [
//       {
//         id: 6,
//         unitId: 2,
//         order: 0,
//         title: "Cửa 0",
//         skip: true,
//         completed: false,
//         challenges: []
//       },
//       {
//         id: 7,
//         unitId: 2,
//         order: 1,
//         title: "Cửa 1",
//         skip: false,
//         completed: false,
//         challenges: [
//           {
//             id: 10,
//             lessonId: 7,
//             order: 1,
//             type: "SELECT",
//             question: "Đâu là 'gốc gác'?",
//             challengeProgress: []
//           }
//         ]
//       }
//     ]
//   }
// ]


})

export const getCourses = cache(async () => { 
    const data = await db.query.courses.findMany();

    return data;
});

export const getCourseById = cache(async (courseId: number) => { //lấy thông tin 1 khoá cụ thể dựa trên id
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        with: {
            units: {
                orderBy: (units, { asc }) => [asc(units.order)],
                with: {
                    lessons: {
                        orderBy: (lessons, { asc }) => [asc(lessons.order)],
                                                    
                    },
                },
            },
        },
    });
    return data;
    // {
    //     id: 1,
    //     title: "English",
    //     units: [
    //         {
    //         id: 1,
    //         title: "Phần 1",
    //         lessons: [
    //             { id: 1, title: "Cửa 1", skip: false },
    //             { id: 2, title: "Cửa 2", skip: true }
    //         ]
    //         },
    //         ...
    //     ]
    // }
});

export const getCourseProgress = cache(async () => { // tìm bài học đầu tiên mà người dùng chưa hoàn thành, bỏ qua các bài skip.
    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCourseId) {
        return null;
    }

    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    unit: true,
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId),
                            }
                        }
                    }
                }
            }
        }
    });

    const firstUncompletedLesson = unitsInActiveCourse
        .flatMap((unit) => unit.lessons)
        .find((lesson) => {
            if (lesson.skip) return false;

            // TODO: if sth does not work, check the last if clause
            return lesson.challenges.some((challenge) => {
                return !challenge.challengeProgress
                    || challenge.challengeProgress.length === 0
                    || challenge.challengeProgress.some((progress) => progress.completed === false);
            });
        });

    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id
    };

    // {
    //     activeLesson: {
    //         id: 7,
    //         title: "Cửa 1",
    //         order: 1,
    //         skip: false,
    //         unitId: 2,
    //         challenges: [
    //         {
    //             id: 21,
    //             type: "SELECT",
    //             order: 1,
    //             question: "Chọn từ đúng",
    //             challengeProgress: [
    //             { userId: "user_123", completed: true }
    //             ]
    //         },
    //         {
    //             id: 22,
    //             type: "ASSIST",
    //             order: 2,
    //             question: "Gõ lại từ",
    //             challengeProgress: [
    //             { userId: "user_123", completed: false } // chưa hoàn thành
    //             ]
    //         }
    //         ]
    //     },
    //     activeLessonId: 7
    // }

});

export const getLesson = cache(async (id?: number) => { //lấy ra lesson dựa trên id
    const { userId } = await await auth();

    if (!userId) {
        return null;
    }

    const courseProgress = await getCourseProgress();
    const lessonId = id || courseProgress?.activeLessonId;

    if (!lessonId) {
        return null;
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challenges: {
                orderBy: (challenges, { asc }) => [asc(challenges.order)],
                with: {
                    challengeOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId),
                    },
                },
            },
        },
    });

    if (!data || !data.challenges) {
        return null;
    }

    const normalizedChallenges = data.challenges.map((challenge) => {
        // TODO: if sth does not work, check the last if clause
        const completed = challenge.challengeProgress
            && challenge.challengeProgress.length > 0
            && challenge.challengeProgress.every((progress) => progress.completed);

        return { ...challenge, completed };
    });

    return { ...data, challenges: normalizedChallenges }

    // {
    //     id: 7,
    //     title: "Cửa 1",
    //     order: 1,
    //     skip: false,
    //     unitId: 2,
    //     challenges: [
    //         {
        //         id: 21,
        //         type: "SELECT",
        //         order: 1,
        //         question: "Chọn từ đúng",
        //         challengeOptions: [...],
        //         challengeProgress: [
        //             {
        //             userId: "user_123",
        //             challengeId: 21,
        //             completed: true
        //             }
        //         ],
        //         completed: true
    //         },
    //         {
        //         id: 22,
        //         type: "ASSIST",
        //         order: 2,
        //         question: '"trà"?',
        //         challengeOptions: [
        //             ...
        //         ],
        //         challengeProgress: [],
        //         completed: false
    //         }
    //     ]
    // }

});

export const getLessonPercentage = cache(async () => {
    const courseProgress = await getCourseProgress();

    if (!courseProgress?.activeLessonId) {
        return 0;
    }

    const lesson = await getLesson(courseProgress.activeLessonId);

    if (!lesson) {
        return 0;
    }

    const completedChallenges = lesson.challenges
        .filter((challenge) => challenge.completed);

    const percentage = Math.round(
        (completedChallenges.length / lesson.challenges.length) * 100,
    );

    return percentage;
});

const DAY_IN_MS = 86_400_000;
export const getUserSubscription = cache(async () => {
    const { userId } = await auth();
    if (!userId) return null;

    const data = await db.query.userSubscription.findFirst({
        where: eq(userSubscription.userId, userId)
    })

    if (!data) return null;

    const isActive =
        data.stripePriceId &&
        data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    return {
        ...data,
        isActive: !!isActive,
    };

});

export const getTopTenUsers = cache (async () => {
const { userId } = await auth();

if (!userId) {
    return [];
}

const data = await db.query.userProgress.findMany({
    orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
    limit: 10,
    columns: {
        userId: true,
        userName: true,
        userImageSrc: true,
        points: true,
        },
    });
    return data; 
});
