"use client"
import { upsertUserProgress } from "@/actions/user-progress";
import { Card } from "./card";
import { courses, userProgress } from "@/db/schema";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/context/language-context"; // Update this path

type Props = {
    courses: typeof courses.$inferSelect[];
    activeCourseId?: typeof userProgress.$inferSelect["activeCourseId"];
};

export const List = ({ courses, activeCourseId }: Props) => {
    
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    const { languageNames } = useLanguage();
    
    const onClick = (id: number) => {
        if (pending) return;

        if (id === activeCourseId) {
            return router.push("/learn");
        }

        startTransition(() => {
            upsertUserProgress(id)
            .catch(() => toast.error("Something went wrong"));
        });
    
    };

    // Function to get translated course title
    const getTranslatedTitle = (courseTitle: string) => {
        // Map database course titles to language codes
        const titleToLanguageCode: { [key: string]: keyof typeof languageNames } = {
            "English": "en",
            "Spanish": "es", 
            "French": "fr",
            "Japanese": "ja",
            "Italian": "it",
            "Vietnamese": "vi"
        };
        
        const languageCode = titleToLanguageCode[courseTitle];
        return languageCode ? languageNames[languageCode] : courseTitle;
    };

    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
           {courses.map((course) => (
            <Card 
            key={course.id}
            id={course.id}
            title={getTranslatedTitle(course.title)}
            imageSrc={course.imageSrc}
            onClick={onClick}
            disabled={pending}
            active={activeCourseId === course.id}
            /> 
              ))}   
        </div>
    );
}