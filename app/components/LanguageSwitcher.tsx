"use client";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Extract current locale from pathname
  const currentLocale = pathname.startsWith("/en") ? "en" : "vi";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    // Replace the locale in the pathname
    let newPath = pathname.replace(/^\/(en|vi)/, `/${newLocale}`);
    // If no locale in path, add it
    if (!/^\/(en|vi)/.test(pathname)) {
      newPath = `/${newLocale}${pathname}`;
    }
    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-5 h-5" />
      <select
        className="bg-transparent text-inherit border-none outline-none cursor-pointer"
        value={currentLocale}
        onChange={handleChange}
        disabled={isPending}
        aria-label="Change language"
      >
        <option value="vi">VI</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
}