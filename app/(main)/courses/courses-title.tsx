"use client";

import { useLanguage } from "@/context/language-context"; // Update this path

export default function CoursesTitle() {
  const { translations } = useLanguage();
  
  return (
    <h1 className="text-2xl font-bold text-neutral-700">
      {translations.languageCourses}
    </h1>
  );
}