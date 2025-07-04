import { useState, useEffect, useRef } from "react";
import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
  options: typeof challengeOptions.$inferSelect[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: typeof challenges.$inferSelect["type"];
};

export const AudioTranscriptionChallenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
}: Props) => {
  const [userAnswer, setUserAnswer] = useState<number[]>([]);
  const [availableOptions, setAvailableOptions] = useState<typeof challengeOptions.$inferSelect[]>([]);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Get the audio source from the first option that has an audioSrc
  const audioSrc = options.find(option => option.audioSrc)?.audioSrc || null;

  // Initialize available options (shuffled)
  // Fisher–Yates shuffle for uniform distribution
  function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  useEffect(() => {
    const shuffled = shuffleArray(options);
    setAvailableOptions(shuffled);
  }, [options]);

  // Handle audio element initialization
  useEffect(() => {
    // Create audio element
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.preload = "auto";
      setAudioElement(audio);
      audioRef.current = audio;

      // Set up event listeners
      audio.addEventListener("loadeddata", () => {
        // Audio is loaded and ready to play
      });

      return () => {
        audio.pause();
        audio.src = "";
      };
    }
  }, [options, audioSrc]);

  // Play the audio at normal speed
  const playAudio = () => {
    if (disabled) return;

    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.playbackRate = 1.0;

      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch((error: Error) => {
          console.error("Error playing audio:", error);
        });
      }
    }
  };

  // Play the audio at slow speed
  const playAudioSlow = () => {
    if (disabled) return;

    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.playbackRate = 0.5;

      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch((error: Error) => {
          console.error("Error playing audio:", error);
        });
      }
    }
  };

  // Handle word selection
  const handleSelectWord = (option: typeof challengeOptions.$inferSelect) => {
    if (disabled) return;

    // Add the word to the user's answer
    setUserAnswer([...userAnswer, option.id]);

    // Remove the word from available options
    setAvailableOptions(availableOptions.filter(o => o.id !== option.id));

    // Check if this completes the answer
    const isComplete = userAnswer.length + 1 === options.filter(o => o.correct).length;

    if (isComplete) {
      // Set the first option's ID as the selectedOption to signal completion
      onSelect(options[0].id);
    }
  };

  // Remove a word from the user's answer
  const handleRemoveWord = (index: number) => {
    if (disabled || status !== "none") return;

    const optionId = userAnswer[index];
    const option = options.find(o => o.id === optionId);

    if (option) {
      // Remove from user answer
      const newUserAnswer = [...userAnswer];
      newUserAnswer.splice(index, 1);
      setUserAnswer(newUserAnswer);

      // Add back to available options
      setAvailableOptions([...availableOptions, option]);
    }
  };

  // Get the text for a word tile based on its ID
  const getWordText = (id: number) => {
    return options.find(o => o.id === id)?.text || "";
  };

  // Reset when status changes back to "none"
  useEffect(() => {
    if (status === "none") {
      setUserAnswer([]);
      setAvailableOptions(shuffleArray(options));
    }
  }, [status, options]);

  return (
    <div className="flex flex-col gap-6">
      {/* Audio player controls */}
      <div className="flex items-end justify-center gap-4 mb-4">
        <Button
          onClick={playAudio}
          disabled={disabled || !audioSrc}
          variant="primary"
          className="w-22 h-22 p-0 rounded-2xl flex items-center justify-center"
          aria-label="Play audio"
          title="Play audio"
        >
          <Image src="/volume.svg" alt="Play" width={50} height={50} />
        </Button>

        <Button
          onClick={playAudioSlow}
          disabled={disabled || !audioSrc}
          variant="primary"
          className="w-15 h-15 p-0 rounded-2xl flex items-center justify-center"
          aria-label="Play slowly"
          title="Play slowly"
        >
          <Image src="/turtle.svg" alt="Play slowly" width={35} height={35} color="white"/>
        </Button>
      </div>

      {/* User's answer area */}
      <div
        className={cn(
          "min-h-[60px] p-4 border-2 rounded-xl flex flex-wrap gap-2 items-center",
          userAnswer.length > 0 ? "justify-start" : "justify-center",
          status === "correct" ? "border-green-300 bg-green-50" :
            status === "wrong" ? "border-rose-300 bg-rose-50" :
              "border-dashed border-gray-300"
        )}
      >
        {userAnswer.length === 0 ? (
          <span className="text-gray-400">Tap the words in order</span>
        ) : (
          userAnswer.map((id, index) => (
            <button
              key={`answer-${id}-${index}`}
              onClick={() => handleRemoveWord(index)}
              disabled={disabled || status !== "none"}
              className={cn(
                "px-3 py-1 rounded-lg bg-sky-100 border border-sky-200 font-medium",
                "hover:bg-sky-200 transition-colors disabled:opacity-80"
              )}
            >
              {getWordText(id)}
            </button>
          ))
        )}
      </div>

      {/* Word tiles */}
      <div className="flex flex-wrap gap-2 justify-center">
        {availableOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelectWord(option)}
            disabled={disabled || status !== "none"}
            className={cn(
              "px-3 py-2 rounded-lg bg-white border-2 border-gray-300 font-medium",
              "hover:bg-gray-100 transition-colors disabled:opacity-50"
            )}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};
