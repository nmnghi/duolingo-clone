import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserSubscription, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import GuidePage from "./content";

export default async function PronounceLayoutPage({ params }: { params: { guideId: string } }) {
  const userProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();
  const guideId = Number(params.guideId);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          streaks={userProgress.streak}
          lastActive={userProgress.lastActive}
          hasActiveSubscription={isPro}
          lastHeartLoss={userProgress.lastHeartLoss}
        />
        {!isPro && <Promo />}
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <GuidePage id={guideId}/>
      </FeedWrapper>
    </div>
  );
}
