'use client'
// import Image from "next/image";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["400"] });

const vowels = [
    { symbol: 'iː', word: 'sheep', audio: 'i dài' },
    { symbol: 'ɪ', word: 'ship', audio: 'ɪ' },
    { symbol: 'ʊ', word: 'foot', audio: 'ʊ' },
    { symbol: 'uː', word: 'food', audio: 'u dài' },
    { symbol: 'ɪə', word: 'here', audio: 'ɪə' },
    { symbol: 'eɪ', word: 'say', audio: 'eɪ' },
    { symbol: 'e', word: 'bed', audio: 'e' },
    { symbol: 'ə', word: 'about', audio: 'ə' },
    { symbol: 'ɜː', word: 'bird', audio: 'ơ dài' },
    { symbol: 'ɔ:', word: 'door', audio: 'o dài' },
    { symbol: 'ʊə', word: 'sure', audio: 'ʊə' },
    { symbol: 'ɔɪ', word: 'boy', audio: 'ɔɪ' },
    { symbol: 'əʊ', word: 'boat', audio: 'əʊ' },
    { symbol: 'æ', word: 'cat', audio: 'æ' },
    { symbol: 'ʌ', word: 'but', audio: 'ʌ' },
    { symbol: 'ɑ:', word: 'far', audio: 'ɑ dai' },
    { symbol: 'ɒ', word: 'on', audio: 'ɒ' },
    { symbol: 'eə', word: 'pair', audio: 'eə' },
    { symbol: 'aɪ', word: 'my', audio: 'aɪ' },
    { symbol: 'aʊ', word: 'cow', audio: 'aʊ' },
];

const consonants = [
    { symbol: 'p', word: 'pen', audio: 'p' },
    { symbol: 'b', word: 'bad', audio: 'b' },
    { symbol: 't', word: 'ten', audio: 't' },
    { symbol: 'd', word: 'dog', audio: 'd' },
    { symbol: 'tʃ', word: 'check', audio: 't∫' },
    { symbol: 'dʒ', word: 'jam', audio: 'dʒ' },
    { symbol: 'k', word: 'cat', audio: 'k' },
    { symbol: 'g', word: 'go', audio: 'g' },
    { symbol: 'f', word: 'fish', audio: 'f' },
    { symbol: 'v', word: 'van', audio: 'v' },
    { symbol: 'θ', word: 'think', audio: 'θ' },
    { symbol: 'ð', word: 'this', audio: 'ð' },
    { symbol: 's', word: 'see', audio: 's' },
    { symbol: 'z', word: 'zoo', audio: 'z' },
    { symbol: 'ʃ', word: 'she', audio: '∫' },
    { symbol: 'ʒ', word: 'measure', audio: 'ʒ' },
    { symbol: 'm', word: 'man', audio: 'm' },
    { symbol: 'n', word: 'no', audio: 'n' },
    { symbol: 'ŋ', word: 'sing', audio: 'η' },
    { symbol: 'h', word: 'hat', audio: 'h' },
    { symbol: 'l', word: 'let', audio: 'l' },
    { symbol: 'r', word: 'red', audio: 'r' },
    { symbol: 'w', word: 'we', audio: 'w' },
    { symbol: 'j', word: 'yes', audio: 'j' },
];


const PronouncePage = () => {
    const onClick = (el: string | undefined, index: number | undefined, type: string) => {
        let audioPlayer;
        if (type === "vowel") {
            audioPlayer = document.getElementById(`audioPlayer-vowel-${index}`) as HTMLAudioElement;
        } else {
            audioPlayer = document.getElementById(`audioPlayer-consonant-${index}`) as HTMLAudioElement;
        }
        if (audioPlayer) {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
            setTimeout(() => {
                const speech = new SpeechSynthesisUtterance(el);
                window.speechSynthesis.speak(speech);
            }, 650)
        }


    };

    return (
        <div className="h-full max-w-[912px] px-3 mx-auto py-8">
            <div className="flex items-center gap-4 my-6">
                <div className="flex-1 border-t border-gray-300 border-[2px]"></div>
                <h1 className="text-2xl font-bold text-neutral-700 whitespace-nowrap">Nguyên âm</h1>
                <div className="flex-1 border-t border-gray-300 border-[2px]"></div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {vowels.map((vowel, index) => (
                    <button key={index} className="" onClick={() => onClick(vowel.word, index, 'vowel')}>
                        <div
                            // key={index}
                            // className="bg-gray-900 text-white p-4 rounded-3xl flex flex-col justify-center text-center border-gray-400 border-solid border-[4px] border-b-[6px]"
                            className="bg-white-900 text-black p-4 rounded-3xl flex flex-col justify-center text-center border-e5e5e5-400 border-solid border-[4px] border-b-[6px] transition duration-150 ease-in-out active:bg-gray-200"
                        >
                            <audio id={`audioPlayer-vowel-${index}`} src={`/audio/${vowel.audio}.mp3`}></audio>
                            {/* <span className="text-3xl font-light">{vowel.symbol}</span> */}
                            <span className={`${notoSans.className} text-3xl`}>
                                {vowel.symbol}
                            </span>
                            <span className="text-gray-500 font-[cursive] text-base mt-1">{vowel.word}</span>
                            <span className="mt-1 border-[4px] border-gray-300 rounded-2xl w-4 mx-auto"></span>
                        </div>
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-4 my-6">
                <div className="flex-1 border-t border-gray-300 border-[2px]"></div>
                <h1 className="text-2xl font-bold text-neutral-700 whitespace-nowrap">Phụ âm</h1>
                <div className="flex-1 border-t border-gray-300 border-[2px]"></div>
            </div>
            <div className="grid grid-cols-4 gap-4 pb-5">
                {consonants.map((consonant, index) => (
                    <button key={index} className="" onClick={() => onClick(consonant.word, index, 'consonant')}>
                        <div
                            // key={index}
                            // className="bg-gray-900 text-white p-4 rounded-3xl flex flex-col justify-center text-center border-gray-400 border-solid border-[4px] border-b-[6px]"
                            className="bg-white-900 text-black p-4 rounded-3xl flex flex-col justify-center text-center border-e5e5e5-400 border-solid border-[4px] border-b-[6px] transition duration-150 ease-in-out active:bg-gray-200"
                        >
                            <audio id={`audioPlayer-consonant-${index}`} src={`/audio/${consonant.audio}.mp3`}></audio>
                            {/* <span className="text-3xl font-light">{vowel.symbol}</span> */}
                            <span className={`${notoSans.className} text-3xl`}>
                                {consonant.symbol}
                            </span>
                            <span className="text-gray-500 font-[cursive] text-base mt-1">{consonant.word}</span>
                            <span className="mt-1 border-[4px] border-gray-300 rounded-2xl w-4 mx-auto"></span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PronouncePage;