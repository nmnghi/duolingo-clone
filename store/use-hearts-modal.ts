import { create } from "zustand";

type HeartsModalState = { 
    isOpen: boolean;
    hearts: number;
    lastHeartLoss: Date | null;
    hasActiveSubscription: boolean;
    open: (hearts: number, lastHeartLoss: Date | null, hasActiveSubscription: boolean) => void;
    close: () => void;
};

export const useHeartsModal = 
create<HeartsModalState>((set) => ({ 
    isOpen: false,
    hearts: 0,
    lastHeartLoss: null,
    hasActiveSubscription: false,
    open: (hearts: number, lastHeartLoss: Date | null, hasActiveSubscription: boolean) => 
        set({ isOpen: true, hearts, lastHeartLoss, hasActiveSubscription }),
    close: () => set({ isOpen: false }), 
}));