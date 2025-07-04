import { cn } from "@/lib/utils"
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
  className?: string
}

const SidebarData = [
  { label: "Learn", href: "/learn", iconSrc: "/learn.svg" },
  { label: "Pronounce", href: "/pronounce", iconSrc: "/headphone.svg" },
  { label: "Leaderboard", href: "/leaderboard", iconSrc: "/leaderboard.svg" },
  { label: "Quests", href: "/quests", iconSrc: "/quests.svg" },
  { label: "shop", href: "/shop", iconSrc: "/shop.svg" },
];

export default function Sidebar({ className }: Props) {
  return (
    <div className={cn(
      "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
      className
    )}>
      <Link href="/learn">
        <div className="flex items-center gap-x-3 pb-7 pl-4 pt-8">
          <Image src="/mascot.svg" alt="Mascot" height={40} width={40} />
          <h1 className="text-2xl font-extrabold tracking-wide text-green-600">
            GoLang
          </h1>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-y-2">
        {SidebarData.map((item) => (
          <SidebarItem
            key={item.href}
            label={item.label}
            href={item.href}
            iconSrc={item.iconSrc}
          />
        ))}
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>
      </div>
    </div>
  );
}