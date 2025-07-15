"use client"; 

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { 
    Dialog,
    DialogContent,
    DialogDescription, 
    DialogFooter, 
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useHeartsModal } from "@/store/use-hearts-modal";

export const HeartsModal = () => {
    const router = useRouter();
    const { isOpen, close, hearts, lastHeartLoss, hasActiveSubscription } = useHeartsModal();
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => setIsClient(true), []);

    const onClick = () => {
        close();
        router.push("/shop");
    }

    const onClose = () => {
        close();
    }
    
    if (!isClient) {
        return null 
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image
                            src="/mascot_bad.svg"
                            alt="Mascot"
                            height={80}
                            width={80}
                        />
                    </div>
                    <DialogTitle className="text-center font-bold">
                        You ran out of hearts!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base mb-4">
                        <p>Hearts regenerate every 20 minutes automatically.</p>
                        <p>Get Pro for unlimited hearts, or purchase them in the store.</p>
                    </DialogDescription>
                </DialogHeader> 
                
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button
                            variant="primary"
                            className="w-full"
                            size="lg"
                            onClick={onClick}
                        >
                            Get unlimited hearts
                        </Button>
                        <Button
                            variant="primaryOutline"
                            className="w-full"
                            size="lg"
                            onClick={onClose}
                        >
                            No thanks
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>       
        </Dialog>
    )
};