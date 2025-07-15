"use client";
import React, { createContext, useContext, useState } from "react";

type Language = "en" | "vi";


const languageNamesMap = {
  en: {
    en: "English",
    vi: "Vietnamese",
    es: "Spanish",
    fr: "French",
    it: "Italian",
    ja: "Japanese",
  },
  vi: {
    en: "Tiếng Anh",
    vi: "Tiếng Việt",
    es: "Tiếng Tây Ban Nha",
    fr: "Tiếng Pháp",
    it: "Tiếng Ý",
    ja: "Tiếng Nhật",
  },
};

const translationsMap = {
  en: {
    languageCourses: "Language Courses",
    englishTitle: "English",
    upgradeToPro: "Upgrade to Pro",
    getUnlimitedHearts: "Get unlimited hearts and more!",
    upgradeToday: "UPGRADE TODAY",
    quests: "Quests",
    viewAll: "VIEW ALL",
    earn20XP: "Earn 20 XP",
    earn50XP: "Earn 50 XP",
    earn100XP: "Earn 100 XP",
    earn500XP: "Earn 500 XP",
    earn1000XP: "Earn 1000 XP",
    // New translations for pages
    completeQuestsEarning: "Complete quests by earning points.",
    shop: "Shop",
    spendPointsCoolStuff: "Spend your points on cool stuff.",
    guide: "Guide",
  },
  vi: {
    languageCourses: "Khóa học ngôn ngữ",
    englishTitle: "Tiếng Anh",
    upgradeToPro: "Nâng cấp lên Pro",
    getUnlimitedHearts: "Nhận tim không giới hạn và nhiều hơn nữa!",
    upgradeToday: "NÂNG CẤP NGAY",
    quests: "Nhiệm vụ",
    viewAll: "XEM TẤT CẢ",
    earn20XP: "Kiếm 20 XP",
    earn50XP: "Kiếm 50 XP",
    earn100XP: "Kiếm 100 XP",
    earn500XP: "Kiếm 500 XP",
    earn1000XP: "Kiếm 1000 XP",

    completeQuestsEarning: "Hoàn thành nhiệm vụ bằng cách kiếm điểm.",
    shop: "Cửa hàng",
    spendPointsCoolStuff: "Chi tiêu điểm của bạn để mua những thứ tuyệt vời.",
    guide: "Hướng dẫn",
  },
};

export function useTranslation() {
  const { translations } = useLanguage();
  
  const t = (key: string): string => {
    return (translations as { [key: string]: string })[key] || key;
  };
  
  return { t };
}

type LanguageContextType = {
  lang: Language;
  toggleLang: () => void;
  languageNames: typeof languageNamesMap["en"];
  translations: typeof translationsMap["en"];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  const toggleLang = () => setLang((prev) => (prev === "en" ? "vi" : "en"));

  const languageNames = languageNamesMap[lang];
  const translations = translationsMap[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, languageNames, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}