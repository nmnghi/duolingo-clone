"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs/server";

import { db } from "@/db/drizzle";
import { getCourseById, getUserProgress, getUserSubscription } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { POINTS_TO_REFILL, HEART_REGENERATION_TIME_MS, MAX_HEARTS } from "@/constants";

export const upsertUserProgress = async (courseId: number) => {
    const { userId } = await auth();
    const user = await currentUser();


    if (!userId || !user) {
        throw new Error("Unauthorized");
    }

    const course = await getCourseById(courseId);
    if (!course) {
        throw new Error("Course not found");
    }

     if (!course.units.length || !course.units[0].lessons.length) {
     throw new Error("Course is empty");
     }

    const existingUserProgress = await getUserProgress();

    if (existingUserProgress) {
        await db.update(userProgress)
            .set({
                activeCourseId: courseId,
                userName: user.firstName || "User",
                userImageSrc: user.imageUrl || "/mascot.png",
            })
            .where(eq(userProgress.userId, userId));

            revalidatePath("/courses");
            revalidatePath("/learn");
            redirect("/learn");

    }

    await db.insert(userProgress)
        .values({
            userId,
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/mascot.png",
        });
    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
};

export const regenerateHearts = async () => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const currentUserProgress = await getUserProgress();

    if (!currentUserProgress) {
        throw new Error("User progress not found");
    }

    if (currentUserProgress.hearts >= MAX_HEARTS) {
        return;
    }

    if (!currentUserProgress.lastHeartLoss) {
        return;
    }

    const timeSinceLastHeartLoss = Date.now() - currentUserProgress.lastHeartLoss.getTime();
    // Calculate how many hearts should be regenerated based on 20-minute intervals
    const heartsToRegenerate = Math.floor(timeSinceLastHeartLoss / HEART_REGENERATION_TIME_MS);

    if (heartsToRegenerate > 0) {
        const newHeartCount = Math.min(currentUserProgress.hearts + heartsToRegenerate, MAX_HEARTS);
        
        await db.update(userProgress).set({
            hearts: newHeartCount,
            // Clear the lastHeartLoss timestamp only when hearts are fully regenerated
            lastHeartLoss: newHeartCount >= MAX_HEARTS ? null : currentUserProgress.lastHeartLoss,
        }).where(eq(userProgress.userId, currentUserProgress.userId));

        revalidatePath("/shop");
        revalidatePath("/learn");
        revalidatePath("/quests");
        revalidatePath("/leaderboard");
    }
};

export const reduceHearts = async (challengeId: number) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const currentUserProgress = await getUserProgress();
    const userSubscription = await getUserSubscription();

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
    })

    if (!challenge) {
        throw new Error("Challenge not found");
    }

    const lessonId = challenge.lessonId;

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId),
        ),
    });

    const isPractice = !!existingChallengeProgress;

    if (isPractice) {
        return { error: "practice"};
    }

    if (!currentUserProgress) {
        throw new Error("User progress not found");
    }

    if (currentUserProgress.hearts === 0 && !userSubscription?.isActive) {
        return { error: "hearts" };
    }
    if (userSubscription?.isActive) {
        return { error: "subscription" };
    }

    await db.update(userProgress).set({
        hearts: Math.max(currentUserProgress.hearts - 1, 0),
        // Only set lastHeartLoss if this is the first heart loss (no existing timestamp) 
        // or if we had full hearts before (meaning hearts were previously regenerated)
        lastHeartLoss: (!currentUserProgress.lastHeartLoss || currentUserProgress.hearts === MAX_HEARTS) 
            ? new Date() 
            : currentUserProgress.lastHeartLoss,
    }).where(eq(userProgress.userId, userId));

    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
};

export const refillHearts = async () => {
    const currentUserProgress = await getUserProgress();

    if (!currentUserProgress) {
        throw new Error("User progress not found");
    }

    if (currentUserProgress.hearts === 5) {
        throw new Error("Hearts are already full");
    }

    if (currentUserProgress.points < POINTS_TO_REFILL) {
        throw new Error("Not enough points");
    }

    await db.update(userProgress).set({
        //Refill one heart for such that points
        hearts: currentUserProgress.hearts + 1,
        points: currentUserProgress.points - POINTS_TO_REFILL,
    }).where(eq(userProgress.userId, currentUserProgress.userId));

    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
};