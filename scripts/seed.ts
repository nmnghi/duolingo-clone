import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DB_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.challengeOptions);
    await db.delete(schema.challenges);
    await db.delete(schema.userProgress);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.lessons);
    await db.delete(schema.units);
    await db.delete(schema.userSubscription);
    await db.delete(schema.courses);

    await db.insert(schema.courses).values([
      { id: 1, title: "English", imageSrc: "/uk.svg" },
      { id: 2, title: "Spanish", imageSrc: "/es.svg" },
      { id: 3, title: "French", imageSrc: "/fr.svg" },
      { id: 4, title: "Japanese", imageSrc: "/jp.svg" },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Phần 1",
        description: "Mời khách xơi nước",
        order: 1,
      },
      {
        id: 2,
        courseId: 1,
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
    ]);

    await db.insert(schema.challenges).values([
      { id: 1, lessonId: 1, type: "SELECT", order: 1, question: 'Đâu là "trà"?' },
      { id: 2, lessonId: 1, type: "ASSIST", order: 2, question: '"trà"?' },
      { id: 3, lessonId: 1, type: "SELECT", order: 3, question: 'Đâu là "sữa"?' },

      { id: 4, lessonId: 2, type: "SELECT", order: 1, question: 'Đâu là "trà"?' },
      { id: 5, lessonId: 2, type: "ASSIST", order: 2, question: '"trà"?' },
      { id: 6, lessonId: 2, type: "SELECT", order: 3, question: 'Đâu là "sữa"?' },

      { id: 12, lessonId: 6, type: "SELECT", order: 1, question: 'Đâu là "trà"?' },
      { id: 13, lessonId: 6, type: "ASSIST", order: 2, question: '"trà"?' },
      { id: 14, lessonId: 6, type: "SELECT", order: 3, question: 'Đâu là "sữa"?' },
    ]);

    await db.insert(schema.challengeOptions).values([
      { challengeId: 1, imageSrc: "/images/tea.png", correct: true, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 1, imageSrc: "/images/coffee.png", correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 1, imageSrc: "/images/milk.png", correct: false, text: "milk", audioSrc: "/uk_milk.mp3" },

      { challengeId: 2, correct: true, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 2, correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 2, correct: false, text: "milk", audioSrc: "/uk_milk.mp3" },

      { challengeId: 3, imageSrc: "/images/tea.png", correct: false, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 3, imageSrc: "/images/coffee.png", correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 3, imageSrc: "/images/milk.png", correct: true, text: "milk", audioSrc: "/uk_milk.mp3" },

      { challengeId: 12, imageSrc: "/images/tea.png", correct: true, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 12, imageSrc: "/images/coffee.png", correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 12, imageSrc: "/images/milk.png", correct: false, text: "milk", audioSrc: "/uk_milk.mp3" },

      { challengeId: 13, correct: true, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 13, correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 13, correct: false, text: "milk", audioSrc: "/uk_milk.mp3" },

      { challengeId: 14, imageSrc: "/images/tea.png", correct: false, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 14, imageSrc: "/images/coffee.png", correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 14, imageSrc: "/images/milk.png", correct: true, text: "milk", audioSrc: "/uk_milk.mp3" },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
