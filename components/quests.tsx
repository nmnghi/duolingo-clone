"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {quests} from "@/constants";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/context/language-context";
type Props = {
    points: number;
};
export const Quests = ({ points }: Props) => {
    const { t } = useTranslation();

    return (                
        <div className="border-2 rounded-xl p-4 space-y-4"> 
            <div className="flex items-center justify-between w-full space-y-2">
        <h3 className="font-bold text-lg">
            {t("quests")}
        </h3>
        <Link href="/quests">
            <Button
                size="sm"
                variant="primaryOutline"
                >
                {t("viewAll")}
            </Button>
        </Link>
        </div>
        <ul className="w-full space-y-4">
            {quests.map((quest) => {
                const progress = (points / quest.value) * 100;                

                    return (
                        <div
                        className="flex items-center w-full pb-4 gap-x-3"
                        key={quest.title}
                        >
                        <Image                                        
                            src="/points.svg"
                            alt={t("points")}
                            width={40}
                            height={40}
                            />
                            <div className="flex flex-col gap-y-2 w-full">
                            <p className="text-neutral-700 text-sm font-bold">
                            {t(quest.title)}
                            </p>
                            <Progress value={progress} className="h-2"/>
                            </div>
                        </div>
                        );   
                })} 
            </ul> 
        </div>    
    
        );
};