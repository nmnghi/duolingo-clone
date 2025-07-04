import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
};

export const UnitBanner = ({ title, description }: Props) => {
  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-cyan-500 p-5 text-white">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>
      <Link href="/lesson">
        <Button
          size="lg"
          className="
            hidden xl:flex
            border-2 border-b-4
            border-cyan-700
            active:border-b-2
            bg-cyan-500
            hover:bg-cyan-600
            active:bg-cyan-700
            text-white
            shadow
            font-bold
            transition
          "
        >
          <NotebookText className="mr-2" />
          Continue
        </Button>
      </Link>
    </div>
  );
};