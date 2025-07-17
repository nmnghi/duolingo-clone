"use client";

import { useHeartsModal } from "@/store/use-hearts-modal";
import { MAX_HEARTS } from "@/constants";

export const useHeartsProtection = () => {
    const { open: openHeartsModal } = useHeartsModal();

    const checkHearts = (hearts: number, hasActiveSubscription: boolean, lastHeartLoss?: Date | null) => {
        if (hasActiveSubscription) {
            return true; // Unlimited hearts for premium users
        }

        if (hearts <= 0) {
            openHeartsModal(hearts, lastHeartLoss || null, hasActiveSubscription);
            return false;
        }

        return true;
    };

    return { checkHearts };
};
