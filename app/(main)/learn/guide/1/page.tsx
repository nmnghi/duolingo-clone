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
          <h2 className="text-xl font-bold">Guide to Door 1</h2>
          <p className="text-gray-500">Learn the primary volcabulary and review the lessons from this door</p>
        </div>
      </div>

      <hr className="my-4" />

      {/* Section title */}
      <div className="mb-2 text-blue-600 font-bold text-sm">PRIMARY VOLCABULARY</div>
      <div className="mb-4 text-lg font-bold">Invite guests to drink water</div>

      {/* Phrase cards */}
      <div className="space-y-4">
        <div className="flex items-center bg-gray-100 rounded-lg p-3">
          <Volume2 className="text-blue-600 mr-3" />
          <div>
            <div className="font-semibold">Welcome!</div>
            <div className="text-gray-500 text-sm">Mời vào!</div>
          </div>
        </div>
        <div className="flex items-center bg-gray-100 rounded-lg p-3">
          <Volume2 className="text-blue-600 mr-3" />
          <div>
            <div className="font-semibold">Coffee or tea?</div>
            <div className="text-gray-500 text-sm">Cà phê hay trà?</div>
          </div>
        </div>
        <div className="flex items-center bg-gray-100 rounded-lg p-3">
          <Volume2 className="text-blue-600 mr-3" />
          <div>
            <div className="font-semibold">Water, please.</div>
            <div className="text-gray-500 text-sm">Vui lòng cho nước.</div>
          </div>
        </div>
      </div>
    </div>
  );
}