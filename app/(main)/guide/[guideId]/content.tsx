import Image from "next/image";
import { ArrowLeft, Volume2 } from "lucide-react";
import Link from "next/link";
import { guides } from "@/db/guide";

type GuidePageProps = {
  id: number;
};

export default function GuidePage({id}: GuidePageProps) {
  const guide = guides.find((g) => g.id === id);

  if (!guide) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center text-red-500">
        Guide not found.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      {/* Back button */}
      <div className="flex items-center mb-6">
        <Link href="/learn">
          <button className="flex items-center text-gray-500 hover:text-gray-700">
            <ArrowLeft className="mr-1" size={20} />
            Back
          </button>
        </Link>
      </div>

      {/* Banner */}
      <div className="flex items-center gap-4 mb-4">
        <Image src="/mascot.svg" alt="Mascot" width={64} height={64} />
        <div>
          <h2 className="text-xl font-bold">{guide.unitTitle}</h2>
          <p className="text-sm text-gray-500">{guide.unitSubtitle}</p>
        </div>
      </div>

      <hr className="my-4" />

      {/* Section title */}
      <div className="mb-2 text-indigo-500 font-bold text-sm">{guide.sectionTitle}</div>
      <div className="mb-4 text-lg font-bold">{guide.sectionSubtitle}</div>

      {/* Phrase cards */}
      <div className="space-y-4">
        {guide.phrases.map((phrase, index) => (
          <div key={index} className="flex items-center bg-gray-100 rounded-lg p-3">
            <Volume2 className="text-indigo-500 mr-3" />
            <div>
              <div className="font-semibold">{phrase.en}</div>
              <div className="text-gray-500 text-sm">{phrase.vi}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
