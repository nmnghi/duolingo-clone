import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema"
const sql = neon(process.env.DB_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try{
        console.log("Seeding database");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

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

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1, // English
                title: "Phần 1",
                description: "Mời khách xơi nước",
                order: 1,
            }
        ])

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1, // Phần 1 (Mời khách xơi nước)
                order: 1,
                title: "Cửa 1",
            },
            {
                id: 2,
                unitId: 1, // Phần 1 (Mời khách xơi nước)
                order: 2,
                title: "Cửa 2",
            },
            {
                id: 3,
                unitId: 1, // Phần 1 (Mời khách xơi nước)
                order: 3,
                title: "Cửa 3",
            },
            {
                id: 4,
                unitId: 1, // Phần 1 (Mời khách xơi nước)
                order: 4,
                title: "Cửa 4",
            },
            {
                id: 5,
                unitId: 1, // Phần 1 (Mời khách xơi nước)
                order: 5,
                title: "Cửa 5",
            }
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1, //Bài học 1
                type: "SELECT",
                order: 1,
                question: 'Đâu là "trà"?',
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1, // Đâu là "trà"?    
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
        ]);

        console.log("Seeding finished")
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
}

main();