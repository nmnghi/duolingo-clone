"use server";

import { and, eq, sql } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/db/drizzle";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";

export const upsertChallengeProgress = async (challengeId: number) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const currentUserProgress = await getUserProgress();
    const userSubscription = await getUserSubscription();
    if (!currentUserProgress) throw new Error("User progress not found");

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
    });
    if (!challenge) throw new Error("Challenge not found");

    const lessonId = challenge.lessonId;

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId),
        ),
    });

    const isPractice = !!existingChallengeProgress;

    if (
        currentUserProgress.hearts === 0 &&
        !isPractice &&
        !userSubscription?.isActive
    ) {
        return { error: "hearts" };
    }

    const allChallenges = await db.query.challenges.findMany({
        where: eq(challenges.lessonId, lessonId),
        orderBy: (ch) => ch.order,
    });

    const isLastChallenge =
        allChallenges[allChallenges.length - 1]?.id === challengeId;

    const pointsToAdd = isLastChallenge
        ? isPractice ? 2 : 5
        : 0;

    if (isPractice) {
        await db.update(challengeProgress).set({
            completed: true,
        }).where(eq(challengeProgress.id, existingChallengeProgress.id));
    } else {
        await db.insert(challengeProgress).values({
            challengeId,
            userId,
            completed: true,
        });
    }

    const updateData: Record<string, unknown> = {};

    if (isPractice) {
        updateData.hearts = Math.min(currentUserProgress.hearts + 1, 5);
    }

    if (pointsToAdd > 0) {
        updateData.points = sql`${userProgress.points} + ${pointsToAdd}`;
    }

    if (Object.keys(updateData).length > 0) {
        await db.update(userProgress)
            .set(updateData)
            .where(eq(userProgress.userId, userId));
    }
    
    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
};
