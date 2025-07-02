import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../quiz";
import { userSubscription } from "@/db/schema";

type Props = {
    params: {
        lessonId: number,
    };
};

const LessonIdPage = async ({
    params
} : Props) => {
    const lessonData = await getLesson(params.lessonId);
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription(); // Assuming user subscription is not needed for this page
    const [
        lesson,
        userProgress,
        userSubscription
    ] = await Promise.all([
        lessonData,
        userProgressData,
        userSubscriptionData
    ]);

    if (!lesson || !userProgress) {
        redirect("/learn");
    }

    if (!lesson.challenges || lesson.challenges.length === 0) {
        redirect("/learn");
    }

    const initialPercentage = lesson.challenges
        .filter((challenge) => challenge.completed)
        .length / lesson.challenges.length * 100;

    return (
        <Quiz
            initialHearts={userProgress.hearts}
            initialPercentage={initialPercentage}
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challenges}
            userSubscription={userSubscription}
        />
    );
}

export default LessonIdPage;  