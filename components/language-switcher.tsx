"use client";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useState, useRef, useEffect } from "react";
export default function LanguageSwitcher() {
  const { lang, toggleLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleSelect = (selected: "en" | "vi") => {
    if (selected !== lang) toggleLang();
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
        aria-label="Change language"
        type="button"
      >
        <Globe className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-50">
          <button
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
              lang === "en" ? "font-bold text-green-600" : ""
            }`}
            onClick={() => handleSelect("en")}
          >
            English
          </button>
          <button
            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
              lang === "vi" ? "font-bold text-green-600" : ""
            }`}
            onClick={() => handleSelect("vi")}
          >
            Vietnamese
          </button>
        </div>
      )}
    </div>
  );
}