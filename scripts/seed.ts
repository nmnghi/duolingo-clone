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
                lessonId: 1,
                type: "ASSIST",
                order: 2,
                question: 'Trà',
            },
            {
                id: 3,
                lessonId: 1,
                type: "SELECT",
                order: 3,
                question: 'Đâu là "cà phê"?',
            },
            {
                id: 4,
                lessonId: 1,
                type: "ASSIST",
                order: 4,
                question: 'Cà phê',
            },
            {
                id: 5,
                lessonId: 1,
                type: "TRANSLATION",
                order: 5,
                question: 'Trà hay cà phê',
            },
            {
                id: 6,
                lessonId: 1,
                type: "TRANSLATION",
                order: 6,
                question: 'Chào mừng',
            },
            {
                id: 7,
                lessonId: 1,
                type: "SELECT",
                order: 7,
                question: 'Đâu là "sữa"?',
            },
            {
                id: 8,
                lessonId: 1,
                type: "AUDIO_TRANSCRIPTION",
                order: 8,
                question: 'Nhấn vào những gì bạn nghe được',
            },
            {
                id: 9,
                lessonId: 1,
                type: "TRANSLATION",
                order: 9,
                question: 'Cà phê với sữa',
            },
            {
                id: 10,
                lessonId: 1,
                type: "TRANSLATION",
                order: 10,
                question: 'Vui lòng cho tôi trà!',
            },
            {
                id: 11,
                lessonId: 2,
                type: "SELECT",
                order: 11,
                question: 'Đâu là "nước"?',
            },
            {
                id: 12,
                lessonId: 2,
                type: "ASSIST",
                order: 12,
                question: 'Nước',
            },
            {
                id: 13,
                lessonId: 2,
                type: "TRANSLATION",
                order: 13,
                question: 'Xin chào',
            },
            {
                id: 14,
                lessonId: 2,
                type: "SELECT",
                order: 14,
                question: 'Đâu là "nước chanh"?',
            },
            {
                id: 15,
                lessonId: 2,
                type: "TRANSLATION",
                order: 15,
                question: 'Sữa với đường',
            },
            {
                id: 16,
                lessonId: 2,
                type: "AUDIO_TRANSCRIPTION",
                order: 16,
                question: 'Nhấn vào những gì bạn nghe được',
            },
            {
                id: 17,
                lessonId: 2,
                type: "SELECT",
                order: 17,
                question: 'Đâu là "nước ép"?',
            },
            {
                id: 18,
                lessonId: 2,
                type: "MATCH",
                order: 18,
                question: 'Ghép từ với nghĩa của nó',
            },
            {
                id: 19,
                lessonId: 2,
                type: "DIALOGUE",
                order: 19,
                question: 'Tea or water',
            },
            {
                id: 20,
                lessonId: 2,
                type: "ASSIST",
                order: 20,
                question: 'Tạm biệt',
            },
            {
                id: 21,
                lessonId: 3,
                type: "TRANSLATION",
                order: 21,
                question: 'Cảm ơn',
            },
            {
                id: 22,
                lessonId: 3,
                type: "AUDIO_TRANSCRIPTION",
                order: 22,
                question: 'Nhấn vào những gì bạn nghe được',
            },
            {
                id: 23,
                lessonId: 3,
                type: "TRANSLATION",
                order: 23,
                question: 'Nước ép hay cà phê',
            },
            {
                id: 24,
                lessonId: 3,
                type: "TRANSLATION",
                order: 24,
                question: 'Đường và sữa',
            },
            {
                id: 25,
                lessonId: 3,
                type: "AUDIO_TRANSCRIPTION",
                order: 25,
                question: 'Nhấn vào những gì bạn nghe được',
            },
            {
                id: 26,
                lessonId: 3,
                type: "TRANSLATION",
                order: 26,
                question: 'Vui lòng cho tôi nước chanh!',
            },
            {
                id: 27,
                lessonId: 3,
                type: "SELECT",
                order: 27,
                question: 'Đâu là "socola nóng"?',
            },
            {
                id: 28,
                lessonId: 3,
                type: "MATCH",
                order: 28,
                question: 'Ghép từ với nghĩa của nó',
            },
            {
                id: 29,
                lessonId: 3,
                type: "DIALOGUE",
                order: 29,
                question: 'How about orange juice?',
            },
            {
                id: 30,
                lessonId: 3,
                type: "DIALOGUE",
                order: 30,
                question: 'What would you like?',
            },
        ])

        await db.insert(schema.challengeOptions).values([
            // Challenge 1 (Lesson 1, SELECT)
            {
                challengeId: 1,
                imageSrc: "/images/tea.png",
                correct: true,
                text: "tea",
                audioSrc: "/tea.mp3",
            },
            {
                challengeId: 1,
                imageSrc: "/images/coffee.png",
                correct: false,
                text: "coffee",
                audioSrc: "/coffee.mp3",
            },
            {
                challengeId: 1,
                imageSrc: "/images/milk.png",
                correct: false,
                text: "milk",
                audioSrc: "/milk.mp3",
            },
            // Challenge 2 (Lesson 1, ASSIST)
            {
                challengeId: 2,
                correct: false,
                text: "milk",
                audioSrc: "/milk.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: "coffee",
                audioSrc: "/coffee.mp3",
            },
            {
                challengeId: 2,
                correct: true,
                text: "tea",
                audioSrc: "/tea.mp3",
            },
            // Challenge 3 (Lesson 1, SELECT)
            {
                challengeId: 3,
                imageSrc: "/images/tea.png",
                correct: false,
                text: "tea",
                audioSrc: "/tea.mp3",
            },
            {
                challengeId: 3,
                imageSrc: "/images/milk.png",
                correct: false,
                text: "milk",
                audioSrc: "/milk.mp3",
            },
            {
                challengeId: 3,
                imageSrc: "/images/coffee.png",
                correct: true,
                text: "coffee",
                audioSrc: "/coffee.mp3",
            },
            // Challenge 4 (Lesson 1, ASSIST)
            {
                challengeId: 4,
                correct: false,
                text: "milk",
                audioSrc: "/milk.mp3",
            },
            {
                challengeId: 4,
                correct: true,
                text: "coffee",
                audioSrc: "/coffee.mp3",
            },
            {
                challengeId: 4,
                correct: true,
                text: "tea",
                audioSrc: "/tea.mp3",
            },
            // Challenge 5 (Lesson 1, TRANSLATION)
            {
                challengeId: 5,
                correct: true,
                text: "tea or coffee",
            },
            // Challenge 6 (Lesson 1, TRANSLATION)
            {
                challengeId: 6,
                correct: true,
                text: "welcome",
            },
            // Challenge 7 (Lesson 1, SELECT)
            {
                challengeId: 7,
                imageSrc: "/images/tea.png",
                correct: false,
                text: "tea",
                audioSrc: "/tea.mp3",
            },
            {
                challengeId: 7,
                imageSrc: "/images/milk.png",
                correct: true,
                text: "milk",
                audioSrc: "/milk.mp3",
            },
            {
                challengeId: 7,
                imageSrc: "/images/coffee.png",
                correct: false,
                text: "coffee",
                audioSrc: "/coffee.mp3",
            },
            // Challenge 8 (Lesson 1, AUDIO_TRANSCRIPTION)
            {
                challengeId: 8,
                correct: true,
                text: "I",
                audioSrc: "/i_love_coffee.mp3",
            },
            {
                challengeId: 8,
                correct: true,
                text: "love",
                audioSrc: "/i_love_coffee.mp3", 
            },
            {
                challengeId: 8,
                correct: true,
                text: "coffee",
                audioSrc: "/i_love_coffee.mp3",
            },
            {
                challengeId: 8,
                correct: false,
                text: "like",
            },
            {
                challengeId: 8,
                correct: false,
                text: "tea",
            },
            {
                challengeId: 8,
                correct: false,
                text: "drinking",
            },
            // Challenge 9 (Lesson 1, TRANSLATION)
            {
                challengeId: 9,
                correct: true,
                text: "coffee with milk",
            },
            // Challenge 10 (Lesson 1, TRANSLATION)
            {
                challengeId: 10,
                correct: true,
                text: "tea please",
            },
            // Challenge 11 (Lesson 2, SELECT)
            {
                challengeId: 11,
                imageSrc: "/images/juice.png",
                correct: false,
                text: "juice",
                audioSrc: "/juice.mp3",
            },
            {
                challengeId: 11,
                imageSrc: "/images/sugar.png",
                correct: false,
                text: "sugar",
                audioSrc: "/sugar.mp3",
            },
            {
                challengeId: 11,
                imageSrc: "/images/water.png",
                correct: true,
                text: "water",
                audioSrc: "/water.mp3",
            },
            // Challenge 12 (Lesson 2, ASSIST)
            {
                challengeId: 12,
                correct: true,
                text: "water",
                audioSrc: "/water.mp3",
            },
            {
                challengeId: 12,
                correct: false,
                text: "coffee",
                audioSrc: "/coffee.mp3",
            },
            {
                challengeId: 12,
                correct: false,
                text: "sugar",
                audioSrc: "/sugar.mp3",
            },
            // Challenge 13 (Lesson 2, TRANSLATION)
            {
                challengeId: 13,
                correct: true,
                text: "hello",
            },
            // Challenge 14 (Lesson 2, SELECT)
            {
                challengeId: 14,
                imageSrc: "/images/coffee.png",
                correct: false,
                text: "coffee",
                audioSrc: "/coffee.mp3",
            },
            {
                challengeId: 14,
                imageSrc: "/images/lemonade.png",
                correct: true,
                text: "lemonade",
                audioSrc: "/lemonade.mp3",
            },
            {
                challengeId: 14,
                imageSrc: "/images/sugar.png",
                correct: false,
                text: "sugar",
                audioSrc: "/sugar.mp3",
            },
            // Challenge 15 (Lesson 2, TRANSLATION)
            {
                challengeId: 15,
                correct: true,
                text: "milk with sugar",
            },
            // Challenge 16 (Lesson 2, AUDIO_TRANSCRIPTION)
            {
                challengeId: 16,
                correct: true,
                text: "Milk",
                audioSrc: "/milk_or_sugar.mp3",
            },
            {
                challengeId: 16,
                correct: true,
                text: "or",
                audioSrc: "/milk_or_sugar.mp3", 
            },
            {
                challengeId: 16,
                correct: true,
                text: "sugar",
                audioSrc: "/milk_or_sugar.mp3",
            },
            {
                challengeId: 16,
                correct: false,
                text: "tea",
            },
            {
                challengeId: 16,
                correct: false,
                text: "with",
            },
            {
                challengeId: 16,
                correct: false,
                text: "coffee",
            },
            // Challenge 17 (Lesson 2, SELECT)
            {
                challengeId: 17,
                imageSrc: "/images/juice.png",
                correct: true,
                text: "juice",
                audioSrc: "/juice.mp3",
            },
            {
                challengeId: 17,
                imageSrc: "/images/lemonade.png",
                correct: false,
                text: "lemonade",
                audioSrc: "/lemonade.mp3",
            },
            {
                challengeId: 17,
                imageSrc: "/images/water.png",
                correct: false,
                text: "water",
                audioSrc: "/water.mp3",
            },
            // Challenge 18 (Lesson 2, MATCH)
            {
                challengeId: 18,
                correct: false,
                text: "xin chào",
                matchId: 1, 
            },
            {
                challengeId: 18,
                correct: false,
                text: "đường",
                matchId: 2,  
            },
            {
                challengeId: 18,
                correct: false,
                text: "vui lòng",
                matchId: 3,  
            },
            {
                challengeId: 18,
                correct: false,
                text: "nước",
                matchId: 4,  
            },
            {
                challengeId: 18,
                correct: true,
                text: "hello",
                audioSrc: "/hello.mp3",
                matchId: 1, 
            },
            {
                challengeId: 18,
                correct: true,
                text: "sugar",
                audioSrc: "/sugar.mp3",
                matchId: 2,  
            },
            {
                challengeId: 18,
                correct: true,
                text: "please",
                audioSrc: "/please.mp3",
                matchId: 3, 
            },
            {
                challengeId: 18,
                correct: true,
                text: "water",
                audioSrc: "/water.mp3",
                matchId: 4, 
            },
            // Challenge 19 (Lesson 2, DIALOGUE)
            {
                challengeId: 19,
                correct: false,
                text: "What would you like to drink?",
                audioSrc: "/tea_or_water.mp3",
            },
            {
                challengeId: 19,
                correct: true,
                text: "Tea, please.",
                audioSrc: "/tea_please.mp3",
            },
            {
                challengeId: 19,
                correct: false,
                text: "Goodbye.",
                audioSrc: "/goodbye.mp3",
            },
            // Challenge 20 (Lesson 2, ASSIST)
            {
                challengeId: 20,
                correct: true,
                text: "goodbye",
                audioSrc: "/goodbye.mp3",
            },
            {
                challengeId: 20,
                correct: false,
                text: "please",
                audioSrc: "/please.mp3",
            },
            {
                challengeId: 20,
                correct: false,
                text: "hello",
                audioSrc: "/hello.mp3",
            },
            // Challenge 21 (Lesson 3, TRANSLATION)
            {
                challengeId: 21,
                correct: true,
                text: "thank you",
            },
            // Challenge 22 (Lesson 3, AUDIO_TRANSCRIPTION)
            {
                challengeId: 22,
                correct: true,
                text: "I",
                audioSrc: "/i_want_some_water.mp3",
            },
            {
                challengeId: 22,
                correct: true,
                text: "want",
                audioSrc: "/i_want_some_water.mp3", 
            },
            {
                challengeId: 22,
                correct: true,
                text: "some",
                audioSrc: "/i_want_some_water.mp33",
            },
            {
                challengeId: 22,
                correct: true,
                text: "water",
                audioSrc: "/i_want_some_water.mp33",
            },
            {
                challengeId: 22,
                correct: false,
                text: "sugar",
            },
            {
                challengeId: 22,
                correct: false,
                text: "like",
            },
            // Challenge 23 (Lesson 3, TRANSLATION)
            {
                challengeId: 23,
                correct: true,
                text: "juice or coffee",
            },
            // Challenge 24 (Lesson 3, TRANSLATION)
            {
                challengeId: 24,
                correct: true,
                text: "sugar and milk",
            },
            // Challenge 25 (Lesson 3, AUDIO_TRANSCRIPTION)
            {
                challengeId: 25,
                correct: true,
                text: "Lemonade",
                audioSrc: "/lemonade_with_no_sugar.mp3",
            },
            {
                challengeId: 25,
                correct: true,
                text: "with",
                audioSrc: "/lemonade_with_no_sugar.mp3", 
            },
            {
                challengeId: 25,
                correct: true,
                text: "no",
                audioSrc: "/lemonade_with_no_sugar.mp3",
            },
            {
                challengeId: 25,
                correct: false,
                text: "sugar",
                audioSrc: "/lemonade_with_no_sugar.mp3",
            },
            {
                challengeId: 25,
                correct: false,
                text: "water",
            },
            {
                challengeId: 25,
                correct: false,
                text: "juice",
            },
            // Challenge 26 (Lesson 3, TRANSLATION)
            {
                challengeId: 26,
                correct: true,
                text: "lemonade please",
            },
            // Challenge 27 (Lesson 3, SELECT)
            {
                challengeId: 27,
                imageSrc: "/images/sugar.png",
                correct: false,
                text: "sugar",
                audioSrc: "/sugar.mp3",
            },
            {
                challengeId: 27,
                imageSrc: "/images/hot_chocolate.png",
                correct: true,
                text: "hot chocolate",
                audioSrc: "/hot_chocolate.mp3",
            },
            {
                challengeId: 27,
                imageSrc: "/images/milk.png",
                correct: false,
                text: "milk",
                audioSrc: "/milk.mp3",
            },
            // Challenge 28 (Lesson 3, MATCH)
            {
                challengeId: 28,
                correct: false,
                text: "nước ép",
                matchId: 1, 
            },
            {
                challengeId: 28,
                correct: false,
                text: "đường",
                matchId: 2,  
            },
            {
                challengeId: 28,
                correct: false,
                text: "cảm ơn",
                matchId: 3,  
            },
            {
                challengeId: 28,
                correct: false,
                text: "nước chanh",
                matchId: 4,  
            },
            {
                challengeId: 28,
                correct: true,
                text: "juice",
                audioSrc: "/juice.mp3",
                matchId: 1, 
            },
            {
                challengeId: 28,
                correct: true,
                text: "sugar",
                audioSrc: "/sugar.mp3",
                matchId: 2,  
            },
            {
                challengeId: 28,
                correct: true,
                text: "thank you",
                audioSrc: "/thank_you.mp3",
                matchId: 3, 
            },
            {
                challengeId: 28,
                correct: true,
                text: "lemonade",
                audioSrc: "/lemonade.mp3",
                matchId: 4, 
            },
            // Challenge 29 (Lesson 3, DIALOGUE)
            {
                challengeId: 29,
                correct: false,
                text: "Do you want something to drink?",
                audioSrc: "/how_about_orange_juice.mp3",
            },
            {
                challengeId: 29,
                correct: true,
                text: "Yes, orange juice is great.",
                audioSrc: "/yes_orange_juice_is_great.mp3",
            },
            {
                challengeId: 29,
                correct: false,
                text: "I like apples.",
                audioSrc: "/i_like_apples.mp3",
            },
            // Challenge 30 (Lesson 3, DIALOGUE)
            {
                challengeId: 30,
                correct: false,
                text: "Can I get you a drink?",
                audioSrc: "/what_would_you_like.mp3",
            },
            {
                challengeId: 30,
                correct: true,
                text: "A bottle of water, please.",
                audioSrc: "/a_bottle_of_water_please.mp3",
            },
            {
                challengeId: 30,
                correct: false,
                text: "What time is it?",
                audioSrc: "/what_time_is_it.mp3",
            },
        ])


        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();