"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { HEART_REGENERATION_TIME_MS, MAX_HEARTS } from "@/constants";

type Props = {
    hearts: number;
    hasActiveSubscription: boolean;
    lastHeartLoss: Date | null;
};

export const HeartStatus = ({ hearts, hasActiveSubscription, lastHeartLoss }: Props) => {
    const [timeUntilNextHeart, setTimeUntilNextHeart] = useState<number>(0);

    useEffect(() => {
        if (hasActiveSubscription || hearts >= MAX_HEARTS || !lastHeartLoss) {
            return;
        }

        const updateTimer = () => {
            const timeSinceLastLoss = Date.now() - lastHeartLoss.getTime();
            const timeUntilNext = HEART_REGENERATION_TIME_MS - (timeSinceLastLoss % HEART_REGENERATION_TIME_MS);
            setTimeUntilNextHeart(timeUntilNext);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [hearts, hasActiveSubscription, lastHeartLoss]);

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center gap-x-2">
            <Image
                src="/heart.svg"
                alt="Hearts"
                width={22}
                height={22}
                className="mr-1"
            />
            {hasActiveSubscription ? (
                <InfinityIcon className="w-4 h-4 stroke-[3] text-rose-500" />
            ) : (
                <span className="text-rose-500 font-bold">
                    {hearts}
                </span>
            )}
            {!hasActiveSubscription && hearts < MAX_HEARTS && lastHeartLoss && timeUntilNextHeart > 0 && (
                <div className="text-xs text-muted-foreground ml-2">
                    {formatTime(timeUntilNextHeart)}
                </div>
            )}
        </div>
    );
};
