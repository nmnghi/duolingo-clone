import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DB_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database...");

     await db.insert(schema.courses).values([
      { id: 1, title: "English", imageSrc: "/uk.svg" },
      { id: 2, title: "Spanish", imageSrc: "/es.svg" },
      { id: 3, title: "French", imageSrc: "/fr.svg" },
      { id: 4, title: "Japanese", imageSrc: "/jp.svg" },
    ]);

    // 📚 Seed units
    await db.insert(schema.units).values([
      { id: 1, courseId: 1, title: "Phần 1", description: "Mời khách xơi nước", order: 1 },
      { id: 2, courseId: 1, title: "Phần 2", description: "Giới thiệu gốc gác", order: 2 },
    ]);

    // 📖 Seed lessons (unit 1: regular, unit 2: có skip lesson)
    await db.insert(schema.lessons).values([
      { id: 1, unitId: 1, order: 1, title: "Cửa 1", skip: false },
      { id: 2, unitId: 1, order: 2, title: "Cửa 2", skip: false },
      { id: 3, unitId: 1, order: 3, title: "Cửa 3", skip: false },
      { id: 4, unitId: 1, order: 4, title: "Cửa 4", skip: false },
      { id: 5, unitId: 1, order: 5, title: "Cửa 5", skip: false },
      { id: 6, unitId: 2, order: 0, title: "Cửa 0", skip: true }, // skip lesson
      { id: 7, unitId: 2, order: 1, title: "Cửa 1", skip: false },
      { id: 8, unitId: 2, order: 2, title: "Cửa 2", skip: false },
    ]);

    // ❓ Seed challenges
    await db.insert(schema.challenges).values([
    // Unit 1 - Lessons 1 to 5
        { id: 1, lessonId: 1, type: "SELECT", order: 1, question: 'Đâu là "trà"?' },
        { id: 2, lessonId: 2, type: "ASSIST", order: 1, question: '"trà" là gì?' },
        { id: 3, lessonId: 3, type: "MATCH", order: 1, question: "Ghép cặp nghĩa" },
        { id: 4, lessonId: 4, type: "AUDIO_TRANSCRIPTION", order: 1, question: "Nghe và viết lại" },
        { id: 5, lessonId: 5, type: "DIALOGUE", order: 1, question: "Trà hay nước?" },

        // Unit 2 - Skip lesson (lessonId: 6)
        { id: 6, lessonId: 6, type: "SELECT", order: 1, question: 'Chọn nghĩa đúng của "milk"' },

        // Unit 2 - Regular lesson (lessonId: 7)
        { id: 7, lessonId: 7, type: "TRANSLATION", order: 1, question: "Cà phê với sữa" },
    ]);


    await db.insert(schema.challengeOptions).values([
        // challengeId: 1 (SELECT)
        { challengeId: 1, text: "tea", correct: true, imageSrc: "/images/tea.png", audioSrc: "/uk_tea.mp3" },
        { challengeId: 1, text: "coffee", correct: false, imageSrc: "/images/coffee.png", audioSrc: "/uk_coffee.mp3" },
        { challengeId: 1, text: "milk", correct: false, imageSrc: "/images/milk.png", audioSrc: "/uk_milk.mp3" },

        // challengeId: 2 (ASSIST)
        { challengeId: 2, text: "tea", correct: true, audioSrc: "/uk_tea.mp3" },
        { challengeId: 2, text: "coffee", correct: false, audioSrc: "/uk_coffee.mp3" },
        { challengeId: 2, text: "milk", correct: false, audioSrc: "/uk_milk.mp3" },

        // challengeId: 3 (MATCH)
        { challengeId: 3, text: "trà", correct: false, matchId: 1 },
        { challengeId: 3, text: "sữa", correct: false, matchId: 2 },
        { challengeId: 3, text: "tea", correct: true, audioSrc: "/uk_tea.mp3", matchId: 1 },
        { challengeId: 3, text: "milk", correct: true, audioSrc: "/uk_milk.mp3", matchId: 2 },

        // challengeId: 4 (AUDIO_TRANSCRIPTION)
        { challengeId: 4, text: "I", correct: true, audioSrc: "/do_you drink_milk.mp3" },
        { challengeId: 4, text: "love", correct: true, audioSrc: "/do_you drink_milk.mp3" },
        { challengeId: 4, text: "coffee", correct: true, audioSrc: "/do_you drink_milk.mp3" },
        { challengeId: 4, text: "milk", correct: false },
        { challengeId: 4, text: "tea", correct: false },

        // challengeId: 5 (DIALOGUE)
        { challengeId: 5, text: "Tea, please.", correct: true, audioSrc: "/tea_please.mp3" },
        { challengeId: 5, text: "Water, please.", correct: false, audioSrc: "/water_please.mp3" },
        { challengeId: 5, text: "Goodbye.", correct: false, audioSrc: "/goodbye.mp3" },

        // challengeId: 6 (Skip lesson SELECT)
        { challengeId: 6, text: "milk", correct: true, imageSrc: "/images/milk.png", audioSrc: "/uk_milk.mp3" },
        { challengeId: 6, text: "tea", correct: false, imageSrc: "/images/tea.png" },
        { challengeId: 6, text: "coffee", correct: false, imageSrc: "/images/coffee.png" },

        // challengeId: 7 (TRANSLATION)
        { challengeId: 7, text: "coffee with milk", correct: true },
        { challengeId: 7, text: "milk with coffee", correct: false },
        { challengeId: 7, text: "tea with milk", correct: false },
    ]);



    console.log("Seeding finished!");
  } catch (error) {
    console.error("Error seeding:", error);
    throw new Error("Failed to seed the database");
  }
};

main();
