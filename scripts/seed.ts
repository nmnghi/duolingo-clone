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
      { id: 1, unitId: 1, order: 1, title: "Cửa 1", skip: false }, //phần 1
      { id: 2, unitId: 1, order: 2, title: "Cửa 2", skip: false },
      { id: 3, unitId: 1, order: 3, title: "Cửa 3", skip: false },
      { id: 4, unitId: 1, order: 4, title: "Cửa 4", skip: false },
      { id: 5, unitId: 1, order: 5, title: "Cửa 5", skip: false },

      { id: 6, unitId: 2, order: 0, title: "Cửa 0", skip: true }, //phần 2
      { id: 7, unitId: 2, order: 1, title: "Cửa 1", skip: false },
      { id: 8, unitId: 2, order: 2, title: "Cửa 2", skip: false },
      { id: 9, unitId: 2, order: 3, title: "Cửa 3", skip: false },
      { id: 10, unitId: 2, order: 4, title: "Cửa 4", skip: false },
      { id: 11, unitId: 2, order: 5, title: "Cửa 5", skip: false },
    ]);

    await db.insert(schema.challenges).values([
      // Unit 1 - Lesson 1
      { id: 1, lessonId: 1, type: "SELECT", order: 1, question: 'Đâu là "trà"?' },
      { id: 2, lessonId: 1, type: "ASSIST", order: 2, question: '"trà"?' },
      { id: 3, lessonId: 1, type: "SELECT", order: 3, question: 'Đâu là "sữa"?' },

      // Unit 1 - Lesson 2
      { id: 4, lessonId: 2, type: "SELECT", order: 1, question: 'Đâu là "trà"?' },
      { id: 5, lessonId: 2, type: "ASSIST", order: 2, question: '"trà"?' },
      { id: 6, lessonId: 2, type: "SELECT", order: 3, question: 'Đâu là "sữa"?' },

      // Unit 1 - Lesson 3
      { id: 7, lessonId: 3, type: "SELECT", order: 1, question: 'Đâu là "trà"?' },
      { id: 8, lessonId: 3, type: "ASSIST", order: 2, question: '"trà"?' },
      { id: 9, lessonId: 3, type: "SELECT", order: 3, question: 'Đâu là "sữa"?' },

      // Unit 1 - Lesson 4
      { id: 10, lessonId: 4, type: "SELECT", order: 1, question: 'Đâu là "trà"?' },
      { id: 11, lessonId: 4, type: "ASSIST", order: 2, question: '"trà"?' },
      { id: 12, lessonId: 4, type: "SELECT", order: 3, question: 'Đâu là "sữa"?' },

      // Unit 1 - Lesson 5
      { id: 13, lessonId: 5, type: "SELECT", order: 1, question: 'Đâu là "trà"?' },
      { id: 14, lessonId: 5, type: "ASSIST", order: 2, question: '"trà"?' },
      { id: 15, lessonId: 5, type: "SELECT", order: 3, question: 'Đâu là "sữa"?' },

      // Unit 2 - Lesson 0 (Skip)
      { id: 16, lessonId: 6, type: "SELECT", order: 1, question: 'Đâu là "trà"?' },
      { id: 17, lessonId: 6, type: "ASSIST", order: 2, question: '"trà"?' },
      { id: 18, lessonId: 6, type: "SELECT", order: 3, question: 'Đâu là "sữa"?' },

      // You can optionally add challenges for lessons 7–11 here...
      // For now we stop at id = 18
    ]);


    await db.insert(schema.challengeOptions).values([
      // Challenge 1
      { challengeId: 1, imageSrc: "/images/tea.png", correct: true, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 1, imageSrc: "/images/coffee.png", correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 1, imageSrc: "/images/milk.png", correct: false, text: "milk", audioSrc: "/uk_milk.mp3" },

      { challengeId: 2, correct: true, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 2, correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 2, correct: false, text: "milk", audioSrc: "/uk_milk.mp3" },

      { challengeId: 3, imageSrc: "/images/tea.png", correct: false, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 3, imageSrc: "/images/coffee.png", correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 3, imageSrc: "/images/milk.png", correct: true, text: "milk", audioSrc: "/uk_milk.mp3" },

      // Challenge 4–6 (reuse set)
      { challengeId: 4, imageSrc: "/images/tea.png", correct: true, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 4, imageSrc: "/images/coffee.png", correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 4, imageSrc: "/images/milk.png", correct: false, text: "milk", audioSrc: "/uk_milk.mp3" },

      { challengeId: 5, correct: true, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 5, correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 5, correct: false, text: "milk", audioSrc: "/uk_milk.mp3" },

      { challengeId: 6, imageSrc: "/images/tea.png", correct: false, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 6, imageSrc: "/images/coffee.png", correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 6, imageSrc: "/images/milk.png", correct: true, text: "milk", audioSrc: "/uk_milk.mp3" },

      // Challenge 7–9 (reuse)
      { challengeId: 7, imageSrc: "/images/tea.png", correct: true, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 7, imageSrc: "/images/coffee.png", correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 7, imageSrc: "/images/milk.png", correct: false, text: "milk", audioSrc: "/uk_milk.mp3" },

      { challengeId: 8, correct: true, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 8, correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 8, correct: false, text: "milk", audioSrc: "/uk_milk.mp3" },

      { challengeId: 9, imageSrc: "/images/tea.png", correct: false, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 9, imageSrc: "/images/coffee.png", correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 9, imageSrc: "/images/milk.png", correct: true, text: "milk", audioSrc: "/uk_milk.mp3" },

      // Challenge 10–12 (reuse)
      { challengeId: 10, imageSrc: "/images/tea.png", correct: true, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 10, imageSrc: "/images/coffee.png", correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 10, imageSrc: "/images/milk.png", correct: false, text: "milk", audioSrc: "/uk_milk.mp3" },

      { challengeId: 11, correct: true, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 11, correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 11, correct: false, text: "milk", audioSrc: "/uk_milk.mp3" },

      { challengeId: 12, imageSrc: "/images/tea.png", correct: false, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 12, imageSrc: "/images/coffee.png", correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 12, imageSrc: "/images/milk.png", correct: true, text: "milk", audioSrc: "/uk_milk.mp3" },

      // Challenge 13–15
      { challengeId: 13, imageSrc: "/images/tea.png", correct: true, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 13, imageSrc: "/images/coffee.png", correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 13, imageSrc: "/images/milk.png", correct: false, text: "milk", audioSrc: "/uk_milk.mp3" },

      { challengeId: 14, correct: true, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 14, correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 14, correct: false, text: "milk", audioSrc: "/uk_milk.mp3" },

      { challengeId: 15, imageSrc: "/images/tea.png", correct: false, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 15, imageSrc: "/images/coffee.png", correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 15, imageSrc: "/images/milk.png", correct: true, text: "milk", audioSrc: "/uk_milk.mp3" },

      // Challenge 16–18 (for skip lesson)
      { challengeId: 16, imageSrc: "/images/tea.png", correct: true, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 16, imageSrc: "/images/coffee.png", correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 16, imageSrc: "/images/milk.png", correct: false, text: "milk", audioSrc: "/uk_milk.mp3" },

      { challengeId: 17, correct: true, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 17, correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 17, correct: false, text: "milk", audioSrc: "/uk_milk.mp3" },

      { challengeId: 18, imageSrc: "/images/tea.png", correct: false, text: "tea", audioSrc: "/uk_tea.mp3" },
      { challengeId: 18, imageSrc: "/images/coffee.png", correct: false, text: "coffee", audioSrc: "/uk_coffee.mp3" },
      { challengeId: 18, imageSrc: "/images/milk.png", correct: true, text: "milk", audioSrc: "/uk_milk.mp3" },
    ]);


    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
