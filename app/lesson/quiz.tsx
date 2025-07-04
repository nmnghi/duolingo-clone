"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */

import { toast } from "sonner";
import Image from "next/image";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useAudio, useWindowSize, useMount } from "react-use";

import { reduceHearts } from "@/actions/user-progress";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";
import { challengeOptions, challenges, lessons, userSubscription } from "@/db/schema"
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { getTranslationUserInput } from "./translation-challenge";

import { Header } from "./header";
import { Footer } from "./footer";
import { Challenge } from "./challenge";
import { ResultCard } from "./result-card";
import { QuestionBubble } from "./question-bubble";

type Props = {
    initialHearts: number,
    initialPercentage: number,
    initialLessonId: number,
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: (typeof challengeOptions.$inferSelect)[];
    })[];
    userSubscription: typeof userSubscription.$inferSelect & {
        isActive: boolean;
} | null;
};    

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonChallenges,
    userSubscription,
}: Props) => {
    const { open: openHeartsModal } = useHeartsModal();
    const { open: openPracticeModal } = usePracticeModal();

    useMount(() => {
        if (initialPercentage === 100) {
            openPracticeModal();
        }
    })

    const { width, height } = useWindowSize();

    const router = useRouter();

    const [finishAudio, _f, finishControls] = useAudio({src: "/finish.mp3",});
    
    const [correctAudio, _c, correctControls] = useAudio({src: "/correct.wav",});
    
    const [incorrectAudio, _i, incorrectControls] = useAudio({src: "/incorrect.wav", });

    const [pending, startTransition] = useTransition();

    const [lessonId] = useState(initialLessonId);
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage;
    });
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex]= useState(() => {
    const uncompletedIndex = challenges.findIndex((challenge)=> ! challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };
    
    const onSelect = (id: number) => {
        if (status != "none") return;

        setSelectedOption(id);
    };

    // Helper for correct answer logic
    const handleCorrect = () => {
        startTransition(() => {
            upsertChallengeProgress(challenge.id)
                .then((response) => {
                    if (response?.error === "hearts") {
                        console.error("Missing hearts");
                        openHeartsModal();
                        return;
                    }
                    correctControls.play();
                    setStatus("correct");
                    setPercentage((prev) => prev + 100 / challenges.length);
                    // This is a practice
                    if (initialPercentage === 100) {
                        setHearts((prev) => Math.min(prev + 1, 5));
                    }
                })
                .catch(() => toast.error("Something went wrong. Please try again"));
        });
    };

    // Helper for incorrect answer logic
    const handleIncorrect = () => {
        startTransition(() => {
            reduceHearts(challenge.id)
                .then((response) => {
                    if (response?.error === "hearts") {
                        openHeartsModal();
                        return;
                    }
                    incorrectControls.play();
                    setStatus("wrong");
                    if (!response?.error) {
                        setHearts((prev) => Math.max(prev - 1, 0));
                    }
                })
                .catch(() => toast.error("Something went wrong. Please try again"));
        });
    };

    const onContinue = () => {
        if (!selectedOption) return;

        if (status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        // Special handling for MATCH and AUDIO_TRANSCRIPTION types
        if (challenge.type === "MATCH" || challenge.type === "AUDIO_TRANSCRIPTION") {
            // For these types, selectedOption === options[0].id means correct/completed
            if (selectedOption === options[0].id) {
                handleCorrect();
            } else {
                handleIncorrect();
            }
            return;
        }

        // Special handling for TRANSLATION type
        if (challenge.type === "TRANSLATION") {
            // For translation challenges, we need to check the user's input
            const userInput = getTranslationUserInput();
            const correctAnswer = options.find(option => option.correct)?.text || "";
            
            // Check if the user's answer matches the correct answer (case-insensitive)
            const isCorrect = userInput.trim().toLowerCase() === correctAnswer.toLowerCase();
            
            if (isCorrect) {
                handleCorrect();
            } else {
                handleIncorrect();
            }
            return;
        }

        const correctOption = options.find((option) => option.correct);
        if (!correctOption) return;

        if (correctOption.id === selectedOption) {
            handleCorrect();
        } else {
            handleIncorrect();
        }
    };

    useEffect(() => {
        if (!challenge) {
            finishControls.play();
        }
    }, [challenge, finishControls]);
    
    // This effect will help reset the match challenge when status changes
    useEffect(() => {
        if (status === "none" && challenge?.type === "MATCH") {
            // Reset selectedOption when status changes to none for MATCH challenges
            setSelectedOption(undefined);
        }
    }, [status, challenge?.type]);

    if (!challenge) {
        return (
            <>
                {finishAudio}
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={10000}
                />
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto 
                text-center items-center justify-center h-full">
                    <Image
                        src="/finish.svg"
                        alt="Finish"
                        className="hidden lg:block"
                        height={100}
                        width={100}
                    />
                    <Image
                        src="/finish.svg"
                        alt="Finish"
                        className="block lg:hidden"
                        height={50}
                        width={50}
                    />
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                        Great job! <br /> You&apos;ve completed the lesson.
                    </h1>
                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard
                            variant="points"
                            value={challenges.length * 10}
                        />
                        <ResultCard
                            variant="hearts"
                            value={hearts}
                        />
                    </div>
                </div>
                <Footer
                    lessonId={lessonId}
                    status="completed"
                    onCheck={() => router.push("/learn")}
                />
            </>
        );
    }

    const title = challenge.type === "ASSIST"
        ? "Chọn đáp án đúng nhất" 
        : challenge.type === "MATCH"
        ? "Ghép từ với nghĩa của nó"
        : challenge.type === "AUDIO_TRANSCRIPTION"
        ? "Nhấn vào những gì bạn nghe được"
        : challenge.type === "DIALOGUE"
        ? "Hoàn thành hội thoại"
        : challenge.type === "TRANSLATION"
        ? "Viết lại bằng tiếng Anh"
        : challenge.question;
    
    return (
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />
            {/* Include audio elements in the DOM */}
            {correctAudio}
            {incorrectAudio}
            {finishAudio}
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg: min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                           {title}
                        </h1>
                        <div>
                            {challenge.type === "ASSIST" && ( 
                                <QuestionBubble question = {challenge.question}/>
                            )}
                            <Challenge
                                options = {options}
                                onSelect = {onSelect}
                                status = {status}
                                selectedOption = {selectedOption}
                                disabled = {pending}
                                type = {challenge.type}
                                question = {challenge.question}
                            />
                        </div>
                    </div>
                </div>
            </div>
             <Footer
                disabled={pending || !selectedOption}
                status={status}
                onCheck={onContinue}
            />
        </>
    );
};