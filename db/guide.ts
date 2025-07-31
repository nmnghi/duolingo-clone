 export interface Phrase {
  en: string;
  vi: string;
}

export interface GuideContent {
  id: number;
  unitTitle: string;
  unitSubtitle: string;
  sectionTitle: string;
  sectionSubtitle: string;
  phrases: Phrase[];
}

export const guides: GuideContent[] = [
  {
    id: 1,
    unitTitle: "Guide to Unit 1",
    unitSubtitle: "Learn the primary vocabulary and review the lessons from this door",
    sectionTitle: "PRIMARY VOCABULARY",
    sectionSubtitle: "Mời khách xơi nước",
    phrases: [
      { en: "Welcome!", vi: "Mời vào!" },
      { en: "Coffee or tea?", vi: "Cà phê hay trà?" },
      { en: "Water, please.", vi: "Vui lòng cho nước." },
    ],
  },
  {
    id: 2,
    unitTitle: "Guide to Unit 2",
    unitSubtitle: "Practice daily greetings and common phrases",
    sectionTitle: "PRIMARY VOCABULARY",
    sectionSubtitle: "Giới thiệu gốc gác",
    phrases: [
      { en: "I am from Japan.", vi: "Tôi đến từ Nhật Bản." },
      { en: "I am from Brazil, and you?", vi: "Tôi đến từ Brazil, còn bạn thì sao?" },
      { en: "I am from France too.", vi: "Tôi cũng là người đến từ Pháp." },
    ],
  },
];
