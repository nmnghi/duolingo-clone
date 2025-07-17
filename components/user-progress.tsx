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
    streaks: number;
    lastActive: Date | null;
    hasActiveSubscription: boolean;
    lastHeartLoss?: Date | null;
}

export const UserProgress = ({ activeCourse, points, hearts, streaks, lastActive, hasActiveSubscription, lastHeartLoss }: Props) => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

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
            <div className="flex">
                <Button variant="ghost" className="text-orange-500">
                    {(today.getTime() === lastActive?.getTime())
                        ?
                        <Image
                            src="/streakActive.svg"
                            alt="Streak"
                            className="mr-3.5"
                            width={17}
                            height={17}
                        />
                        :
                        <Image
                            src="/streakInActive.svg"
                            alt="Streak"
                            className="mr-3.5"
                            width={17}
                            height={17}
                        />
                    }
                    {hasActiveSubscription
                        ? <InfinityIcon className="w-4 h-4 stroke-[3]" />
                        : streaks}
                </Button>
            </div>
        </div>
    )
}