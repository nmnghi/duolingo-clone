import { courses } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { InfinityIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeartStatus } from "./heart-status";

type Props = {
    activeCourse: typeof courses.$inferSelect;
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
    lastHeartLoss?: Date | null;
}

export const UserProgress = ({ activeCourse, points, hearts, hasActiveSubscription, lastHeartLoss }: Props) => {
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Link href="/courses">
                <Button variant="ghost">
                    <Image
                        src={activeCourse.imageSrc}
                        alt={activeCourse.title}
                        className="rounded-md border"
                        width={32}
                        height={32}
                    />
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-orange-500">
                    <Image
                        src="/points.svg"
                        alt="Points"
                        className="mr-2"
                        width={28}
                        height={28}
                    />
                    {points}
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-rose-500">
                    <HeartStatus 
                        hearts={hearts}
                        hasActiveSubscription={hasActiveSubscription}
                        lastHeartLoss={lastHeartLoss || null}
                    />
                </Button>
            </Link>
        </div>
    )
}