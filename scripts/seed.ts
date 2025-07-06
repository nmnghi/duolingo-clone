import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DB_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database");

        // Xóa dữ liệu cũ
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);
        await db.delete(schema.userSubscription);

        // Thêm courses
        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "English",
                imageSrc: "/uk.svg",
            },
            {
                id: 2,
                title: "Spanish",
                imageSrc: "/es.svg",
            },
            {
                id: 3,
                title: "French",
                imageSrc: "/fr.svg",
            },
            {
                id: 4,
                title: "Japanese",
                imageSrc: "/jp.svg",
            },
        ]);

        // Thêm units
        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1, // English
                title: "Phần 1",
                description: "Mời khách xơi nước",
                order: 1,
            },
            {
                id: 2,
                courseId: 1, // English
                title: "Phần 2",
                description: "Giới thiệu gốc gác",
                order: 2,
            },
        ]);

        await db.insert(schema.lessons).values([
        { id: 1, unitId: 1, order: 1, title: "Cửa 1", skip: false },
        { id: 2, unitId: 1, order: 2, title: "Cửa 2", skip: false },
        { id: 3, unitId: 1, order: 3, title: "Cửa 3", skip: false },
        { id: 4, unitId: 1, order: 4, title: "Cửa 4", skip: false },
        { id: 5, unitId: 1, order: 5, title: "Cửa 5", skip: false },
        { id: 6, unitId: 2, order: 0, title: "Cửa 0", skip: true },
        { id: 7, unitId: 2, order: 1, title: "Cửa 1", skip: false },
        { id: 8, unitId: 2, order: 2, title: "Cửa 2", skip: false },
        { id: 9, unitId: 2, order: 3, title: "Cửa 3", skip: false },
        { id: 10, unitId: 2, order: 4, title: "Cửa 4", skip: false },
        { id: 11, unitId: 2, order: 5, title: "Cửa 5", skip: false },
        ])

        await db.insert(schema.challenges).values([
        // Lesson 1
        { id: 1, lessonId: 1, type: "SELECT", order: 1, question: 'Đâu là "trà"?' },
        { id: 2, lessonId: 1, type: "ASSIST", order: 2, question: "Trà" },
        { id: 3, lessonId: 1, type: "TRANSLATION", order: 3, question: "Chào mừng" },
        { id: 4, lessonId: 1, type: "AUDIO_TRANSCRIPTION", order: 4, question: "Nhấn vào những gì bạn nghe được" },
        { id: 5, lessonId: 1, type: "MATCH", order: 5, question: "Ghép từ với nghĩa của nó" },
        { id: 6, lessonId: 1, type: "DIALOGUE", order: 6, question: "Tea or water?" },

        // Lesson 2 → SELECT
        { id: 7, lessonId: 2, type: "SELECT", order: 1, question: 'Đâu là "nước"?' },

        // Lesson 3 → ASSIST
        { id: 8, lessonId: 3, type: "ASSIST", order: 1, question: "Nước ép" },

        // Lesson 4 → TRANSLATION
        { id: 9, lessonId: 4, type: "TRANSLATION", order: 1, question: "Vui lòng cho tôi cà phê!" },

        // Lesson 5 → AUDIO_TRANSCRIPTION
        { id: 10, lessonId: 5, type: "AUDIO_TRANSCRIPTION", order: 1, question: "Nhấn vào những gì bạn nghe được" },

        // Lesson 6 (skip)
        { id: 11, lessonId: 6, type: "SELECT", order: 1, question: 'Đâu là "nước chanh"?' },
        { id: 12, lessonId: 6, type: "ASSIST", order: 2, question: "Đường" },
        { id: 13, lessonId: 6, type: "TRANSLATION", order: 3, question: "Tôi thích nước cam" },
        { id: 14, lessonId: 6, type: "AUDIO_TRANSCRIPTION", order: 4, question: "Nhấn vào những gì bạn nghe được" },
        { id: 15, lessonId: 6, type: "MATCH", order: 5, question: "Ghép từ với nghĩa của nó" },
        { id: 16, lessonId: 6, type: "DIALOGUE", order: 6, question: "How about orange juice?" },

        // Lesson 7 → SELECT
        { id: 17, lessonId: 7, type: "SELECT", order: 1, question: 'Đâu là "Pháp"?' },

        // Lesson 8 → ASSIST
        { id: 18, lessonId: 8, type: "ASSIST", order: 1, question: "Nhật Bản" },
        ]);

await db.insert(schema.challengeOptions).values([
  // Challenge 1: SELECT - "trà"
  { challengeId: 1, imageSrc: "/images/tea.png", correct: true, text: "tea", audioSrc: "/tea.mp3" },
  { challengeId: 1, imageSrc: "/images/coffee.png", correct: false, text: "coffee", audioSrc: "/coffee.mp3" },
  { challengeId: 1, imageSrc: "/images/milk.png", correct: false, text: "milk", audioSrc: "/milk.mp3" },

  // Challenge 2: ASSIST - "Trà"
  { challengeId: 2, correct: true, text: "tea", audioSrc: "/tea.mp3" },
  { challengeId: 2, correct: false, text: "milk", audioSrc: "/milk.mp3" },
  { challengeId: 2, correct: false, text: "coffee", audioSrc: "/coffee.mp3" },

  // Challenge 3: TRANSLATION - "Chào mừng"
  { challengeId: 3, correct: true, text: "welcome" },

  // Challenge 4: AUDIO_TRANSCRIPTION
  { challengeId: 4, correct: true, text: "I", audioSrc: "/i_love_coffee.mp3" },
  { challengeId: 4, correct: true, text: "love", audioSrc: "/i_love_coffee.mp3" },
  { challengeId: 4, correct: true, text: "coffee", audioSrc: "/i_love_coffee.mp3" },
  { challengeId: 4, correct: false, text: "like" },
  { challengeId: 4, correct: false, text: "sugar" },

  // Challenge 5: MATCH
  { challengeId: 5, correct: false, text: "trà", matchId: 1 },
  { challengeId: 5, correct: false, text: "cà phê", matchId: 2 },
  { challengeId: 5, correct: false, text: "xin chào", matchId: 3 },
  { challengeId: 5, correct: false, text: "vui lòng", matchId: 4 },
  { challengeId: 5, correct: true, text: "tea", audioSrc: "/tea.mp3", matchId: 1 },
  { challengeId: 5, correct: true, text: "coffee", audioSrc: "/coffee.mp3", matchId: 2 },
  { challengeId: 5, correct: true, text: "hello", audioSrc: "/hello.mp3", matchId: 3 },
  { challengeId: 5, correct: true, text: "please", audioSrc: "/please.mp3", matchId: 4 },

  // Challenge 6: DIALOGUE
  { challengeId: 6, correct: false, text: "Tea or water?", audioSrc: "/tea_or_water.mp3" },
  { challengeId: 6, correct: true, text: "Tea, please.", audioSrc: "/tea_please.mp3" },
  { challengeId: 6, correct: false, text: "Goodbye.", audioSrc: "/goodbye.mp3" },

  // Challenge 7: SELECT - "nước"
  { challengeId: 7, imageSrc: "/images/water.png", correct: true, text: "water", audioSrc: "/water.mp3" },
  { challengeId: 7, imageSrc: "/images/juice.png", correct: false, text: "juice", audioSrc: "/juice.mp3" },
  { challengeId: 7, imageSrc: "/images/sugar.png", correct: false, text: "sugar", audioSrc: "/sugar.mp3" },

  // Challenge 8: ASSIST - "Nước ép"
  { challengeId: 8, correct: true, text: "juice", audioSrc: "/juice.mp3" },
  { challengeId: 8, correct: false, text: "milk", audioSrc: "/milk.mp3" },
  { challengeId: 8, correct: false, text: "hot chocolate", audioSrc: "/hot_chocolate.mp3" },

  // Challenge 9: TRANSLATION - "Vui lòng cho tôi cà phê!"
  { challengeId: 9, correct: true, text: "coffee please" },

  // Challenge 10: AUDIO_TRANSCRIPTION
  { challengeId: 10, correct: true, text: "Lemonade", audioSrc: "/lemonade_with_no_sugar.mp3" },
  { challengeId: 10, correct: true, text: "with", audioSrc: "/lemonade_with_no_sugar.mp3" },
  { challengeId: 10, correct: true, text: "no", audioSrc: "/lemonade_with_no_sugar.mp3" },
  { challengeId: 10, correct: true, text: "sugar", audioSrc: "/lemonade_with_no_sugar.mp3" },
  { challengeId: 10, correct: false, text: "water" },
  { challengeId: 10, correct: false, text: "juice" },

  // Challenge 11: SELECT - "nước chanh"
  { challengeId: 11, imageSrc: "/images/lemonade.png", correct: true, text: "lemonade", audioSrc: "/lemonade.mp3" },
  { challengeId: 11, imageSrc: "/images/juice.png", correct: false, text: "juice", audioSrc: "/juice.mp3" },
  { challengeId: 11, imageSrc: "/images/water.png", correct: false, text: "water", audioSrc: "/water.mp3" },

  // Challenge 12: ASSIST - "Đường"
  { challengeId: 12, correct: true, text: "sugar", audioSrc: "/sugar.mp3" },
  { challengeId: 12, correct: false, text: "milk", audioSrc: "/milk.mp3" },
  { challengeId: 12, correct: false, text: "juice", audioSrc: "/juice.mp3" },

  // Challenge 13: TRANSLATION - "Tôi thích nước cam"
  { challengeId: 13, correct: true, text: "I like orange juice" },

  // Challenge 14: AUDIO_TRANSCRIPTION
  { challengeId: 14, correct: true, text: "milk", audioSrc: "/milk_or_sugar.mp3" },
  { challengeId: 14, correct: true, text: "or", audioSrc: "/milk_or_sugar.mp3" },
  { challengeId: 14, correct: true, text: "sugar", audioSrc: "/milk_or_sugar.mp3" },
  { challengeId: 14, correct: false, text: "tea" },
  { challengeId: 14, correct: false, text: "with" },

  // Challenge 15: MATCH
  { challengeId: 15, correct: false, text: "sữa", matchId: 1 },
  { challengeId: 15, correct: false, text: "nước ép", matchId: 2 },
  { challengeId: 15, correct: false, text: "cảm ơn", matchId: 3 },
  { challengeId: 15, correct: false, text: "đường", matchId: 4 },
  { challengeId: 15, correct: true, text: "milk", audioSrc: "/milk.mp3", matchId: 1 },
  { challengeId: 15, correct: true, text: "juice", audioSrc: "/juice.mp3", matchId: 2 },
  { challengeId: 15, correct: true, text: "thank you", audioSrc: "/thank_you.mp3", matchId: 3 },
  { challengeId: 15, correct: true, text: "sugar", audioSrc: "/sugar.mp3", matchId: 4 },

  // Challenge 16: DIALOGUE
  { challengeId: 16, correct: false, text: "How about orange juice?", audioSrc: "/how_about_orange_juice.mp3" },
  { challengeId: 16, correct: true, text: "Yes, orange juice is great.", audioSrc: "/yes_orange_juice_is_great.mp3" },
  { challengeId: 16, correct: false, text: "I like apples.", audioSrc: "/i_like_apples.mp3" },

  // Challenge 17: SELECT - "Pháp"
  { challengeId: 17, imageSrc: "/images/france.png", correct: true, text: "France", audioSrc: "/france.mp3" },
  { challengeId: 17, imageSrc: "/images/mexico.png", correct: false, text: "Mexico", audioSrc: "/mexico.mp3" },
  { challengeId: 17, imageSrc: "/images/japan.png", correct: false, text: "Japan", audioSrc: "/japan.mp3" },

  // Challenge 18: ASSIST - "Nhật Bản"
  { challengeId: 18, correct: false, text: "France", audioSrc: "/france.mp3" },
  { challengeId: 18, correct: true, text: "Japan", audioSrc: "/japan.mp3" },
  { challengeId: 18, correct: false, text: "Mexico", audioSrc: "/mexico.mp3" },
]);


        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();