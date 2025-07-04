import { challengeOptions, challenges } from "@/db/schema"
import { cn } from "@/lib/utils";

import {Card} from "./card";
import { MatchChallenge } from "./match-challenge";
import { AudioTranscriptionChallenge } from "./audio-transcription-challenge";
import { DialogueChallenge } from "./dialogue-challenge";

type Props ={
    options: typeof challengeOptions.$inferSelect[];
    onSelect: (id: number) => void;
    status: "correct" | "wrong" | "none";
    selectedOption?: number;
    disabled?: boolean;
    type: typeof challenges.$inferSelect["type"];
    question?: string;
};
export const Challenge =({
    options,
    onSelect,
    status,
    selectedOption,
    disabled,
    type,
    question,

}: Props) =>{
    if (type === "MATCH") {
        return (
            <MatchChallenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={disabled}
                type={type}
            />
        );
    }
    
    if (type === "AUDIO_TRANSCRIPTION") {
        return (
            <AudioTranscriptionChallenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={disabled}
                type={type}
            />
        );
    }
    
    if (type === "DIALOGUE") {
        return (
            <DialogueChallenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={disabled}
                type={type}
                question={question || ""}
            />
        );
    }
    
    return (
        <div className={cn(
            "grid gap-2",
            type === "ASSIST" && "grid-cols-1",
            type === "SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
            )}>
            {options.map((option, i) => (
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
                    type={type}
                />
                ))}
        </div>
    );
}