/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { challengeOptions, challenges } from "@/db/schema"
import { useState } from "react";
import { Header } from "./header";

type Props = {
    initialHearts: number,
    initialPercentage: number,
    initialLessonId: number,
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any;
};

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubscription,
}: Props) => {
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    return (
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />
        </>
    )
}