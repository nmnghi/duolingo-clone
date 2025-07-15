"use client";

import { useEffect } from "react";
import { toast } from "sonner";

type Props = {
    previousHearts: number;
    currentHearts: number;
    hasActiveSubscription: boolean;
};

export const HeartNotification = ({ previousHearts, currentHearts, hasActiveSubscription }: Props) => {
    useEffect(() => {
        if (!hasActiveSubscription && currentHearts > previousHearts) {
            const regeneratedHearts = currentHearts - previousHearts;
            if (regeneratedHearts > 0) {
                toast.success(`You gained ${regeneratedHearts} heart${regeneratedHearts > 1 ? 's' : ''}! 💖`);
            }
        }
    }, [previousHearts, currentHearts, hasActiveSubscription]);

    return null; // This component doesn't render anything
};
