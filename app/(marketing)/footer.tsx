import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        <Button size="lg" variant="ghost" className="transition duration-200 hover:scale-105">
          <Image
            src="/uk.svg"
            alt="United Kingdom"
            height={32}
            width={40}
            className="mr-4 rounded-md"
            style={{ width: "auto" }}
          />
          United Kingdom
        </Button>
        <Button size="lg" variant="ghost" className="transition duration-200 hover:scale-105">
          <Image
            src="/es.svg"
            alt="Spanish"
            height={32}
            width={40}
            className="mr-4 rounded-md"
            style={{ width: "auto" }}
          />
          Spanish
        </Button>
        <Button size="lg" variant="ghost" className="transition duration-200 hover:scale-105">
          <Image
            src="/fr.svg"
            alt="French"
            height={32}
            width={40}
            className="mr-4 rounded-md"
            style={{ width: "auto" }}
          />
          French
        </Button>
        <Button size="lg" variant="ghost" className="transition duration-200 hover:scale-105">
          <Image
            src="/it.svg"
            alt="Italian"
            height={32}
            width={40}
            className="mr-4 rounded-md"
            style={{ width: "auto" }}
          />
          Italian
        </Button>
        <Button size="lg" variant="ghost" className="transition duration-200 hover:scale-105">
          <Image
            src="/jp.svg"
            alt="Japanese"
            height={32}
            width={40}
            className="mr-4 rounded-md"
            style={{ width: "auto" }}
          />
          Japanese
        </Button>
      </div>
    </footer>
  );
}