"use client";

import { List } from "./list";
import { courses, userProgress } from "@/db/schema";

type Props = {
    courses: typeof courses.$inferSelect[];
    activeCourseId?: typeof userProgress.$inferSelect["activeCourseId"];
};

export default function ListWrapper({ courses, activeCourseId }: Props) {
  return (
    <List 
      courses={courses}
      activeCourseId={activeCourseId}
    />
  );
}