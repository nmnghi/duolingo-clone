import { useState, useEffect } from "react";
import { challengeOptions, challenges } from "@/db/schema";
import { Card } from "./card";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
    options: typeof challengeOptions.$inferSelect[];
    onSelect: (id: number) => void;
    status: "correct" | "wrong" | "none";
    selectedOption?: number;
    disabled?: boolean;
    type: typeof challenges.$inferSelect["type"];
    question: string;
};

export const DialogueChallenge = ({
    options,
    onSelect,
    status,
    selectedOption,
    disabled,
    question,
}: Props) => {
    const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
    
    // Find the question audio (usually the first option with audioSrc)
    const questionAudio = options.find(option => option.audioSrc && !option.correct);
    
    useEffect(() => {
        if (!questionAudio?.audioSrc) {
            setAudioElement(null);
            return;
        }
        
        const audio = new Audio(questionAudio.audioSrc);
        setAudioElement(audio);
        
        return () => {
            audio.pause();
            audio.src = "";
        };
    }, [questionAudio?.audioSrc]);
    
    const playQuestionAudio = () => {
        if (audioElement && questionAudio?.audioSrc) {
            try {
                audioElement.currentTime = 0;
                const playPromise = audioElement.play();
                if (playPromise !== undefined) {
                    playPromise.catch((error: Error) => {
                        console.error("Error playing audio:", error);
                    });
                }
            } catch (error) {
                console.error("Error trying to play audio:", error);
            }
        }
    };

    // Filter options to show response choices (exclude the question audio)
    // The question audio is the option with audioSrc and correct: false
    const responseOptions = options.filter(option => option.text !== questionAudio?.text);

    return (
        <div className="space-y-8">
            {/* Conversation Flow */}
            <div className="space-y-6">
                {/* Bear asking the question */}
                <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0">
                        <Image
                            src="/characters/bear.svg"
                            alt="Bear"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="mb-1">
                            <span className="text-xs lg:text-sm font-medium text-neutral-500">Bear</span>
                        </div>
                        <div 
                            className={cn(
                                "relative bg-blue-100 border-2 border-blue-200 rounded-2xl rounded-tl-none p-4 shadow-sm cursor-pointer hover:bg-blue-150 transition-colors",
                                "before:absolute before:top-0 before:-left-2 before:w-0 before:h-0",
                                "before:border-t-[8px] before:border-t-blue-100 before:border-r-[8px] before:border-r-transparent"
                            )}
                            onClick={playQuestionAudio}
                        >
                            <p className="text-sm lg:text-base text-neutral-800 font-medium">
                                {question}
                            </p>
                            {questionAudio?.audioSrc && (
                                <div className="flex items-center gap-2 mt-2 text-xs text-neutral-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.14" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5v14l-4-2-4 2V5l4 2 4-2z" />
                                    </svg>
                                    <span>Click to listen</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Oscar's response area */}
                <div className="flex items-start gap-4 flex-row-reverse -mb-5">
                    <div className="relative w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0">
                        <Image
                            src="/characters/oscar.svg"
                            alt="Oscar"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="mb-1 text-right">
                            <span className="text-xs lg:text-sm font-medium text-neutral-500">Oscar</span>
                        </div>
                        <div className="min-h-[60px] flex items-center justify-end">
                            {selectedOption ? (
                                <div 
                                    className={cn(
                                        "relative max-w-xs rounded-2xl rounded-tr-none p-4 shadow-sm",
                                        "before:absolute before:top-0 before:-right-2 before:w-0 before:h-0",
                                        status === "correct" ? "bg-green-100 border-2 border-green-200 before:border-t-green-100" :
                                        status === "wrong" ? "bg-red-100 border-2 border-red-200 before:border-t-red-100" :
                                        "bg-gray-100 border-2 border-gray-200 before:border-t-gray-100",
                                        "before:border-l-[8px] before:border-l-transparent"
                                    )}
                                >
                                    <p className="text-sm lg:text-base text-neutral-800 font-medium">
                                        {responseOptions.find(option => option.id === selectedOption)?.text}
                                    </p>
                                </div>
                            ) : (
                                <div className="text-gray-400 text-sm lg:text-base font-medium">
                                    Thinking...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Response options */}
            <div className="space-y-3">
                <div className="grid gap-3">
                    {responseOptions.map((option, i) => (
                        <Card
                            key={option.id}
                            id={option.id}
                            text={option.text}
                            imageSrc={option.imageSrc}
                            shortcut={`${i + 1}`}
                            selected={selectedOption === option.id}
                            onClick={() => onSelect(option.id)}
                            status={status}
                            audioSrc={option.audioSrc}
                            disabled={disabled}
                            type="DIALOGUE"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
