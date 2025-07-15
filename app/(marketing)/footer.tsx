'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useLanguage } from "@/context/language-context"; // Update this path

export default function Footer() {
  const { languageNames } = useLanguage();

  return (
    <footer className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        <Button size="lg" variant="ghost" className="transition duration-200 hover:scale-105">
          <Image
            src="/uk.svg"
            alt={languageNames.en}
            height={32}
            width={40}
            className="mr-4 rounded-md"
            style={{ width: "auto" }}
          />
          {languageNames.en}
        </Button>
        <Button size="lg" variant="ghost" className="transition duration-200 hover:scale-105">
          <Image
            src="/es.svg"
            alt={languageNames.es}
            height={32}
            width={40}
            className="mr-4 rounded-md"
            style={{ width: "auto" }}
          />
          {languageNames.es}
        </Button>
        <Button size="lg" variant="ghost" className="transition duration-200 hover:scale-105">
          <Image
            src="/fr.svg"
            alt={languageNames.fr}
            height={32}
            width={40}
            className="mr-4 rounded-md"
            style={{ width: "auto" }}
          />
          {languageNames.fr}
        </Button>
        <Button size="lg" variant="ghost" className="transition duration-200 hover:scale-105">
          <Image
            src="/it.svg"
            alt={languageNames.it}
            height={32}
            width={40}
            className="mr-4 rounded-md"
            style={{ width: "auto" }}
          />
          {languageNames.it}
        </Button>
        <Button size="lg" variant="ghost" className="transition duration-200 hover:scale-105">
          <Image
            src="/jp.svg"
            alt={languageNames.ja}
            height={32}
            width={40}
            className="mr-4 rounded-md"
            style={{ width: "auto" }}
          />
          {languageNames.ja}
        </Button>
      </div>
    </footer>
  );
}