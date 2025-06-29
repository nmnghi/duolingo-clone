'use client'
import Image from "next/image";

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
    { symbol: 'eə', word: 'cow', audio: 'eə' },
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
            }, 750)
        }


    };

    return (
        <div className="h-full max-w-[912px] px-3 mx-auto py-8">
            <h1 className="text-2xl font-bold text-neutral-700 mb-6">Nguyên âm</h1>
            <div className="grid grid-cols-4 gap-4">
                {vowels.map((vowel, index) => (
                    <div
                        key={index}
                        className="bg-gray-900 text-white p-4 rounded-lg flex flex-col justify-center text-center"
                    >
                        <button className="flex justify-start w-5" onClick={() => onClick(vowel.word, index, 'vowel')}>
                            <Image
                                className="invert"
                                src="volume.svg"
                                alt="volume"
                                height={20}
                                width={20}
                            />
                            <audio id={`audioPlayer-vowel-${index}`} src={`/audio/${vowel.audio}.mp3`}></audio>
                        </button>
                        <span className="text-3xl font-bold">{vowel.symbol}</span>
                        <span className="text-sm mt-1">{vowel.word}</span>
                    </div>
                ))}
            </div>

            <h1 className="text-2xl font-bold text-neutral-700 mb-6 pt-6">Phụ âm</h1>
            <div className="grid grid-cols-4 gap-4 pb-5">
                {consonants.map((consonant, index) => (
                    <div
                        key={index}
                        className="bg-gray-900 text-white p-4 rounded-lg flex flex-col justify-center text-center"
                    >
                        <button className="flex justify-start w-5" onClick={() => onClick(consonant.word, index, 'consonant')}>
                            <Image
                                className="invert"
                                src="volume.svg"
                                alt="volume"
                                height={20}
                                width={20}
                            />
                            <audio id={`audioPlayer-consonant-${index}`} src={`/audio/${consonant.audio}.mp3`}></audio>
                        </button>
                        <span className="text-3xl font-bold">{consonant.symbol}</span>
                        <span className="text-sm mt-1">{consonant.word}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PronouncePage;