import Image from "next/image";
import { ArrowLeft, Volume2 } from "lucide-react";
import Link from "next/link";

export default function GuidePage() {
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
        <Image
          src="/mascot.svg" // Place your Duolingo owl image in public/ as duo-owl.png
          alt="Mascot"
          width={64}
          height={64}
        />
        <div>
          <h2 className="text-xl font-bold">Guide to Door 2</h2>
          <p className="text-gray-500">Learn the primary volcabulary and review the lessons from this door</p>
        </div>
      </div>

      <hr className="my-4" />

      {/* Section title */}
      <div className="mb-2 text-blue-600 font-bold text-sm">PRIMARY VOLCABULARY</div>
      <div className="mb-4 text-lg font-bold">Introduction to ancestry</div>

      {/* Phrase cards */}
      <div className="space-y-4">
        <div className="flex items-center bg-gray-100 rounded-lg p-3">
          <Volume2 className="text-blue-600 mr-3" />
          <div>
            <div className="font-semibold">Hi, I am from Vietnam!</div>
            <div className="text-gray-500 text-sm">Xin chào, tôi đến từ Việt Nam!</div>
          </div>
        </div>
        <div className="flex items-center bg-gray-100 rounded-lg p-3">
          <Volume2 className="text-blue-600 mr-3" />
          <div>
            <div className="font-semibold">Where are you from?</div>
            <div className="text-gray-500 text-sm">Bạn đến từ đâu?</div>
          </div>
        </div>
        <div className="flex items-center bg-gray-100 rounded-lg p-3">
          <Volume2 className="text-blue-600 mr-3" />
          <div>
            <div className="font-semibold">What is your hometown?</div>
            <div className="text-gray-500 text-sm">Quê hương của bạn là gì</div>
          </div>
        </div>
      </div>
    </div>
  );
}