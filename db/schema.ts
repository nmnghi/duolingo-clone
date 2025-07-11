import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
});

export const courseRelations = relations(courses, ({ many }) => ({
    userProgress: many(userProgress),
    units: many(units),
}));

export const units = pgTable("units", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    courseId: integer("course_id").references(() => courses.id, {
        onDelete: "cascade"
    }).notNull(),
    order: integer("order").notNull(),
});

export const unitsRelations = relations(units, ({ many, one }) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id],
    }),
    lessons: many(lessons),
}));

export const lessons = pgTable("lessons", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    unitId: integer("unit_id").references(() => units.id, {
        onDelete: "cascade"
    }).notNull(),
    order: integer("order").notNull(),
    skip: boolean("skip").notNull().default(false),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id],
    }),
    challenges: many(challenges),
}));

export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST", "MATCH", "AUDIO_TRANSCRIPTION", "DIALOGUE", "TRANSLATION"]);

export const challenges = pgTable("challenges", {
    id: serial("id").primaryKey(),
    lessonId: integer("lesson_id").references(() => lessons.id, {
        onDelete: "cascade"
    }).notNull(),
    type: challengesEnum("type").notNull(),
    question: text("question").notNull(),
    order: integer("order").notNull(),
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
    lesson: one(lessons, {
        fields: [challenges.lessonId],
        references: [lessons.id],
    }),
    challengeOptions: many(challengeOptions),
    challengeProgress: many(challengeProgress),
}));

export const challengeOptions = pgTable("challenge_options", {
    id: serial("id").primaryKey(),
    challengeId: integer("challenge_id").references(() => challenges.id, {
        onDelete: "cascade"
    }).notNull(),
    text: text("text").notNull(),
    correct: boolean("correct").notNull(),
    imageSrc: text("image_src"),
    audioSrc: text("audio_src"),
    // Adding matchId to indicate which options are pairs in a MATCH challenge
    // Options with the same matchId are considered a matching pair
    matchId: integer("match_id"),
});

export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeOptions.challengeId],
        references: [challenges.id],
    }),
}),
);

export const challengeProgress = pgTable("challenge_progress", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    challengeId: integer("challenge_id").references(() => challenges.id, {
        onDelete: "cascade"
    }).notNull(),
    completed: boolean("completed").notNull().default(false),
    completedAt: timestamp("completed_at", { withTimezone: false })
});

export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeProgress.challengeId],
        references: [challenges.id],
    }),
}));

export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/mascot.png"),
    activeCourseId: integer("active_course_id").references(() => courses.id, {
        onDelete: "cascade"
    }),
    hearts: integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(0),
    lastActive: timestamp("last_active", { withTimezone: false })
        .defaultNow()
    ,

    streak: integer("streak").notNull().default(0),

    longestStreak: integer("longest_streak").notNull().default(0),
});

// export const userStreak = pgTable("user_streak", {
//     userId: text("user_id")
//         .primaryKey()
//         .references(() => userProgress.userId, {
//             onDelete: "cascade",
//         }),

//     lastActive: timestamp("last_active", { withTimezone: false })
//         .defaultNow()
//         .notNull(),

//     streak: integer("streak").notNull().default(0),

//     longestStreak: integer("longest_streak").notNull().default(0),
// });

// export const userStreakRelations = relations(userStreak, ({ one }) => ({
//     user: one(userProgress, {
//         fields: [userStreak.userId],
//         references: [userProgress.userId],
//     }),
// }));

// export const userProgressRelations = relations(userProgress, ({ one }) => ({
//     streakData: one(userStreak, {
//         fields: [userProgress.userId],
//         references: [userStreak.userId],
//     }),
//     activeCourse: one(courses, {
//         fields: [userProgress.activeCourseId],
//         references: [courses.id],
//     }),
// }));


export const userProgressRelations = relations(userProgress, ({ one }) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id],
    }),
}));

export const userSubscription = pgTable("user_subscription", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull().unique(),
    stripeCustomerId: text("stripe_customer_id").notNull().unique(),
    stripeSubcriptionId: text("stripe_subcription_id").notNull().unique(),
    stripePriceId: text("stripe_price_id").notNull(),
    stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull(),
})