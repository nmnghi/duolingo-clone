"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import LanguageSwitcher from "@/components/language-switcher";

export const Header = ({ title }: { title: string }) => {
  const { translations } = useLanguage();

  const getTranslatedTitle = (title: string): string => {
    // Map database titles to translation keys
    const titleMap: { [key: string]: string } = {
      "English": (translations as { [key: string]: string })["englishTitle"] || "English",
      // Add more course titles as needed
    };
    
    return titleMap[title] || title;
  };

  return (
    <div className="sticky top-0 mb-5 flex items-center justify-between border-b-2 bg-white pb-3 text-neutral-400 lg:z-50 lg:mt-[-28px] lg:pt-[28px]">
      <Link href="/courses">
        <Button variant="ghost" size="sm">
          <ArrowLeftIcon className="h-5 w-5 stroke-2 text-neutral-400" />
        </Button>
      </Link>
      
      <h1 className="text-lg font-bold">{getTranslatedTitle(title)}</h1>

      <div />
    </div>
  );
};