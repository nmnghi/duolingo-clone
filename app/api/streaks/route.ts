import { db } from "@/db/drizzle";
import { challengeProgress, userProgress } from "@/db/schema";
import { getAuth } from "@clerk/nextjs/server";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const auth = getAuth(req);

    const userId = auth.userId;
    console.log('User: ', userId);


    if (!userId) return new NextResponse('Unauthorized', { status: 403 });

    const user = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
    });

    if (!user) {
        return new NextResponse("User not found", { status: 404 });
    }

    const lastCompleted = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.completed, true),
            isNotNull(challengeProgress.completedAt)
        ),
        orderBy: desc(challengeProgress.completedAt),
    });

    if (!lastCompleted?.completedAt) {
        return null;
    }

    const completedLessonDate = new Date(lastCompleted.completedAt);
    completedLessonDate.setUTCHours(0, 0, 0, 0);

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // const yesterday = new Date();
    // yesterday.setUTCDate(today.getUTCDate() - 1);
    // yesterday.setUTCHours(0, 0, 0, 0);

    const day = 1000 * 60 * 60 * 24;

    let streak = user.streak;

    if (streak === null || streak === undefined) {
        streak = 0;
    }

    let longestStreak = user.longestStreak;

    // console.log(completedLessonDate);
    // console.log(user.lastActive);
    // console.log(today);
    // console.log(today.getTime());
    // console.log(user.lastActive.getTime());
    // console.log((today.getTime() - user.lastActive.getTime()) / day);

    if (user.lastActive === null) {
        await db.update(userProgress).set({
            streak,
            longestStreak,
            lastActive: today,
        }).where(eq(userProgress.userId, userId));
        return;
    }

    if (
        completedLessonDate.getTime() === today.getTime() &&
        (today.getTime() - user.lastActive.getTime()) / day <= 1 &&
        user.lastActive.getTime() !== today.getTime()
    ) {
        console.log('tang streak');

        streak = user.streak + 1;
        longestStreak = Math.max(streak, user.longestStreak);
    } else if ((today.getTime() - user.lastActive.getTime()) / day > 1) {
        console.log('ngat streak');
        streak = 1; //trả về 1
        longestStreak = Math.max(streak, user.longestStreak);
    }


    await db.update(userProgress).set({
        streak,
        longestStreak,
        lastActive: today,
    }).where(eq(userProgress.userId, userId));

    return new NextResponse("Success", { status: 200 });

}