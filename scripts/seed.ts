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

        // Thêm lessons với thuộc tính skip
        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1, // Phần 1 (Mời khách xơi nước)
                order: 1,
                title: "Cửa 1",
                skip: false,
            },
            {
                id: 2,
                unitId: 1, // Phần 1 (Mời khách xơi nước)
                order: 2,
                title: "Cửa 2",
                skip: false,
            },
            {
                id: 3,
                unitId: 1, // Phần 1 (Mời khách xơi nước)
                order: 3,
                title: "Cửa 3",
                skip: false,
            },
            {
                id: 4,
                unitId: 1, // Phần 1 (Mời khách xơi nước)
                order: 4,
                title: "Cửa 4",
                skip: false,
            },
            {
                id: 5,
                unitId: 1, // Phần 1 (Mời khách xơi nước)
                order: 5,
                title: "Cửa 5",
                skip: false,
            },
            {
                id: 6,
                unitId: 2, // Phần 2 (Giới thiệu gốc gác)
                order: 0,
                title: "Cửa 0",
                skip: true, // Bài skip
            },
            {
                id: 7,
                unitId: 2, // Phần 2 (Giới thiệu gốc gác)
                order: 1,
                title: "Cửa 1",
                skip: false,
            },
        ]);

        // Thêm một challenge cho mỗi lesson, mỗi challenge có type khác nhau
        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Đâu là "trà"?',
            },
            {
                id: 2,
                lessonId: 2,
                type: "ASSIST",
                order: 1,
                question: '"trà"?',
            },
            {
                id: 3,
                lessonId: 3,
                type: "MATCH",
                order: 1,
                question: 'Ghép từ với nghĩa của nó',
            },
            {
                id: 4,
                lessonId: 4,
                type: "AUDIO_TRANSCRIPTION",
                order: 1,
                question: 'Viết những gì bạn nghe',
            },
            {
                id: 5,
                lessonId: 5,
                type: "DIALOGUE",
                order: 1,
                question: 'Tea or water?',
            },
            {
                id: 6,
                lessonId: 6, // Bài skip
                type: "TRANSLATION",
                order: 1,
                question: 'Cà phê với sữa',
            },
            {
                id: 7,
                lessonId: 7,
                type: "SELECT", // Lặp lại type SELECT cho đơn giản
                order: 1,
                question: 'Đâu là "sữa"?',
            },
        ]);

        // Thêm challengeOptions cho mỗi challenge
        await db.insert(schema.challengeOptions).values([
            // Challenge 1 (Lesson 1, SELECT)
            {
                challengeId: 1,
                imageSrc: "/images/tea.png",
                correct: true,
                text: "tea",
                audioSrc: "/uk_tea.mp3",
            },
            {
                challengeId: 1,
                imageSrc: "/images/coffee.png",
                correct: false,
                text: "coffee",
                audioSrc: "/uk_coffee.mp3",
            },
            {
                challengeId: 1,
                imageSrc: "/images/milk.png",
                correct: false,
                text: "milk",
                audioSrc: "/uk_milk.mp3",
            },
            // Challenge 2 (Lesson 2, ASSIST)
            {
                challengeId: 2,
                correct: true,
                text: "tea",
                audioSrc: "/uk_tea.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: "coffee",
                audioSrc: "/uk_coffee.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: "milk",
                audioSrc: "/uk_milk.mp3",
            },
            // Challenge 3 (Lesson 3, MATCH)
            {
                challengeId: 3,
                correct: false,
                text: "trà",
                matchId: 1, // Matches with "tea"
            },
            {
                challengeId: 3,
                correct: false,
                text: "cà phê",
                matchId: 2, // Matches with "coffee"
            },
            {
                challengeId: 3,
                correct: false,
                text: "sữa",
                matchId: 3, // Matches with "milk"
            },
            {
                challengeId: 3,
                correct: true,
                text: "tea",
                audioSrc: "/uk_tea.mp3",
                matchId: 1, // Matches with "trà"
            },
            {
                challengeId: 3,
                correct: true,
                text: "coffee",
                audioSrc: "/uk_coffee.mp3",
                matchId: 2, // Matches with "cà phê"
            },
            {
                challengeId: 3,
                correct: true,
                text: "milk",
                audioSrc: "/uk_milk.mp3",
                matchId: 3, // Matches with "sữa"
            },
            // Challenge 4 (Lesson 4, AUDIO_TRANSCRIPTION)
            {
                challengeId: 4,
                correct: true,
                text: "I",
                audioSrc: "/i_love_coffee.mp3",
            },
            {
                challengeId: 4,
                correct: true,
                text: "love",
                audioSrc: "/i_love_coffee.mp3",
            },
            {
                challengeId: 4,
                correct: true,
                text: "coffee",
                audioSrc: "/i_love_coffee.mp3",
            },
            {
                challengeId: 4,
                correct: false,
                text: "like",
            },
            {
                challengeId: 4,
                correct: false,
                text: "tea",
            },
            {
                challengeId: 4,
                correct: false,
                text: "drinking",
            },
            // Challenge 5 (Lesson 5, DIALOGUE)
            {
                challengeId: 5,
                correct: false,
                text: "What would you like to drink?",
                audioSrc: "/tea_or_water.mp3",
            },
            {
                challengeId: 5,
                correct: true,
                text: "Tea, please.",
                audioSrc: "/tea_please.mp3",
            },
            {
                challengeId: 5,
                correct: false,
                text: "Goodbye.",
                audioSrc: "/goodbye.mp3",
            },
            // Challenge 6 (Lesson 6, TRANSLATION)
            {
                challengeId: 6,
                correct: true,
                text: "coffee with milk",
            },
            // Challenge 7 (Lesson 7, SELECT)
            {
                challengeId: 7,
                imageSrc: "/images/milk.png",
                correct: true,
                text: "milk",
                audioSrc: "/uk_milk.mp3",
            },
            {
                challengeId: 7,
                imageSrc: "/images/tea.png",
                correct: false,
                text: "tea",
                audioSrc: "/uk_tea.mp3",
            },
            {
                challengeId: 7,
                imageSrc: "/images/coffee.png",
                correct: false,
                text: "coffee",
                audioSrc: "/uk_coffee.mp3",
            },
        ]);

        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();