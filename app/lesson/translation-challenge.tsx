/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from "react";
import { challengeOptions, challenges } from "@/db/schema";
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

// Store user input globally for the quiz to access
let globalUserInput = "";

export const TranslationChallenge = ({
    options,
    onSelect,
    status,
    selectedOption,
    disabled,
    question,
}: Props) => {
    const [userInput, setUserInput] = useState("");
    const [submittedAnswer, setSubmittedAnswer] = useState<string | null>(null);
    const [inputDisabled, setInputDisabled] = useState(false);
    
    // Reset input when challenge status changes
    useEffect(() => {
        if (status === "none") {
            setUserInput("");
            setSubmittedAnswer(null);
            setInputDisabled(false);
            globalUserInput = "";
        }
    }, [status]);
    
    const handleSubmit = () => {
        if (!userInput.trim() || inputDisabled) return;
        
        setSubmittedAnswer(userInput);
        setInputDisabled(true);
        globalUserInput = userInput;
        
        // Find the correct option ID to trigger the quiz logic
        const correctOption = options.find(option => option.correct);
        if (correctOption) {
            onSelect(correctOption.id);
        }
    };
    
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };
    
    return (
        <div className="flex flex-col items-center space-y-6 p-6">
            {/* Bear Character */}
            <div className="flex items-center justify-center">
                <div className="relative">
                    <Image
                        src="/characters/bear.svg"
                        alt="Bear character"
                        width={120}
                        height={120}
                        className="drop-shadow-lg"
                    />
                </div>
                {/* Vietnamese Text to Translate */}
                <div className="bg-white rounded-lg p-4 border-2 border-neutral-200">
                    <p className="text-lg font-semibold text-neutral-800 text-center">
                        {question}
                    </p>
                </div>
            </div>
            
            {/* Input Field */}
            <div className="w-full max-w-md">
                <div className="relative">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your translation here..."
                        disabled={inputDisabled}
                        className={cn(
                            "w-full px-4 py-3 border-2 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500",
                            inputDisabled && "bg-gray-100 cursor-not-allowed",
                            status === "correct" && "border-green-500 bg-green-50",
                            status === "wrong" && "border-red-500 bg-red-50",
                            status === "none" && "border-neutral-300 bg-white"
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

// Export the global user input for the quiz to access
export const getTranslationUserInput = () => globalUserInput;
