import { useState, useEffect } from "react";
import { challengeOptions, challenges } from "@/db/schema"
import { Card } from "./card";

type Props = {
    options: typeof challengeOptions.$inferSelect[];
    onSelect: (id: number) => void;
    status: "correct" | "wrong" | "none";
    selectedOption?: number;
    disabled?: boolean;
    type: typeof challenges.$inferSelect["type"];
};

export const MatchChallenge = ({
    options,
    onSelect,
    status,
    selectedOption,
    disabled,
}: Props) => {
    const sourceOptionsOriginal = options.filter(option => !option.correct);
    const targetOptionsOriginal = options.filter(option => option.correct);

    // Use state to store shuffled options
    const [sourceOptions, setSourceOptions] = useState<typeof challengeOptions.$inferSelect[]>([]);
    const [targetOptions, setTargetOptions] = useState<typeof challengeOptions.$inferSelect[]>([]);
    const [selectedSource, setSelectedSource] = useState<number | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<{ [key: number]: number }>({});

    // Shuffle options once when component mounts
    useEffect(() => {
        // Only shuffle if not already shuffled to maintain consistency during retries
        if (sourceOptions.length === 0 || targetOptions.length === 0) {
            setSourceOptions([...sourceOptionsOriginal].sort(() => Math.random() - 0.5));
            setTargetOptions([...targetOptionsOriginal].sort(() => Math.random() - 0.5));
        }
    }, [sourceOptionsOriginal, targetOptionsOriginal, sourceOptions.length, targetOptions.length]);

    // Reset state when the quiz status changes back to "none"
    useEffect(() => {
        // When status changes to "none", it means either:
        // 1. Initial render
        // 2. User clicked "retry" after wrong answer 
        // 3. User proceeding to next challenge
        if (status === "none" || status === "wrong") {
            // Add a small delay to ensure the visual feedback happens first
            const timer = setTimeout(() => {
                setMatchedPairs({});
                setSelectedSource(null);
            }, status === "wrong" ? 0 : 0);  // Immediate for wrong status

            return () => clearTimeout(timer);
        }
    }, [status]);

    // Handle selection of a source or target item
    const handleSelect = (id: number, isSource: boolean) => {
        if (disabled) return;

        // If already matched, do nothing
        if (Object.values(matchedPairs).includes(id) || Object.keys(matchedPairs).map(Number).includes(id)) {
            return;
        }

        if (isSource) {
            // If the same source is already selected, deselect it
            if (selectedSource === id) {
                setSelectedSource(null);
                return;
            }

            setSelectedSource(id);

            // If we already had a target selected, try to make a pair
            if (selectedOption !== undefined && selectedOption !== -1) {
                const selectedSourceOption = options.find(o => o.id === id);
                const selectedTargetOption = options.find(o => o.id === selectedOption);

                if (selectedSourceOption && selectedTargetOption) {
                    // Convert to number for comparison if they exist
                    const sourceMatchId = selectedSourceOption.matchId !== null ? Number(selectedSourceOption.matchId) : null;
                    const targetMatchId = selectedTargetOption.matchId !== null ? Number(selectedTargetOption.matchId) : null;

                    // Correct match if matchIds match
                    const isMatch = sourceMatchId !== null &&
                        targetMatchId !== null &&
                        sourceMatchId === targetMatchId;

                    if (isMatch) {
                        // Add to matched pairs
                        setMatchedPairs(prev => ({
                            ...prev,
                            [id]: selectedOption
                        }));

                        // Reset selections
                        setSelectedSource(null);
                        onSelect(-1); // Clear selected target
                    } else {
                        // Wrong match
                        setTimeout(() => {
                            setSelectedSource(null);
                            onSelect(-1);
                        }, 1000);
                    }
                }
            }
        } else {
            // If the same target is already selected, deselect it
            if (selectedOption === id) {
                onSelect(-1);
                return;
            }

            // Target selection
            onSelect(id);

            // If we already had a source selected, try to make a pair
            if (selectedSource !== null) {
                const selectedSourceOption = options.find(o => o.id === selectedSource);
                const selectedTargetOption = options.find(o => o.id === id);

                if (selectedSourceOption && selectedTargetOption) {
                    // Convert to number for comparison if they exist
                    const sourceMatchId = selectedSourceOption.matchId !== null ? Number(selectedSourceOption.matchId) : null;
                    const targetMatchId = selectedTargetOption.matchId !== null ? Number(selectedTargetOption.matchId) : null;

                    // Correct match if matchIds match
                    const isMatch = sourceMatchId !== null &&
                        targetMatchId !== null &&
                        sourceMatchId === targetMatchId;

                    if (isMatch) {
                        // Add to matched pairs
                        setMatchedPairs(prev => ({
                            ...prev,
                            [selectedSource]: id
                        }));

                        // Reset selections
                        setSelectedSource(null);
                        onSelect(-1);
                    } else {
                        // Wrong match - flash effect by keeping selections for a moment
                        setTimeout(() => {
                            setSelectedSource(null);
                            onSelect(-1);
                        }, 1000);
                    }
                }
            }
        }
    };

    // Determine if a card is matched
    const isMatched = (id: number) => {
        return matchedPairs[id] !== undefined || Object.values(matchedPairs).includes(id);
    };

    // Separate effect for handling completion to avoid race conditions
    useEffect(() => {
        // Only trigger when all pairs are matched and we're not in the middle of a selection
        if (Object.keys(matchedPairs).length === sourceOptions.length &&
            selectedOption === -1 &&
            options.length > 0 &&
            !disabled) {
            // Use setTimeout to avoid state updates during rendering cycle
            const timer = setTimeout(() => {
                onSelect(options[0].id);
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [matchedPairs, sourceOptions.length, selectedOption, options, onSelect, disabled]);

    return (
        <div className="grid grid-cols-2 gap-6">
            {/* Source column (native language) */}
            <div className="flex flex-col gap-2">
                {sourceOptions.map((option, i) => (
                    <Card
                        key={option.id}
                        id={option.id}
                        text={option.text}
                        imageSrc={option.imageSrc}
                        shortcut={`${i + 1}`}
                        selected={selectedSource === option.id || isMatched(option.id)}
                        onClick={() => handleSelect(option.id, true)}
                        status={isMatched(option.id) ? "correct" : status}
                        audioSrc={option.audioSrc}
                        disabled={disabled || isMatched(option.id)}
                        type="MATCH"
                    />
                ))}
            </div>

            {/* Target column (learning language) */}
            <div className="flex flex-col gap-2">
                {targetOptions.map((option, i) => (
                    <Card
                        key={option.id}
                        id={option.id}
                        text={option.text}
                        imageSrc={option.imageSrc}
                        shortcut={`${String.fromCharCode(65 + i)}`} // Use A, B, C, etc.
                        selected={selectedOption === option.id || isMatched(option.id)}
                        onClick={() => handleSelect(option.id, false)}
                        status={isMatched(option.id) ? "correct" : status}
                        audioSrc={option.audioSrc}
                        disabled={disabled || isMatched(option.id)}
                        type="MATCH"
                    />
                ))}
            </div>
        </div>
    );
};
