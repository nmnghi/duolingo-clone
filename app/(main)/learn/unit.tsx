/* eslint-disable @typescript-eslint/no-unused-vars */

import { lessons, units } from "@/db/schema";
import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
    skip: boolean;
  })[];
  activeLesson: typeof lessons.$inferSelect & {
    unit: typeof units.$inferSelect;
  } | undefined;
  activeLessonPercentage: number;
  allUnits: (typeof units.$inferSelect & {
    lessons: (typeof lessons.$inferSelect & {
      completed: boolean;
      skip: boolean;
    })[];
  })[]; 
  hearts: number;
  hasActiveSubscription: boolean;
  lastHeartLoss?: Date | null;
};

export const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
  allUnits,
  hearts,
  hasActiveSubscription,
  lastHeartLoss,
}: Props) => {
    
  const allPreviousUnitsCompleted = allUnits
    .filter((u) => u.order < order)
    .every((u) =>
      u.lessons
        .filter((l) => !l.skip)
        .every((l) => l.completed)
    );

  // ✅ THAY ĐỔI: chỉ hiển thị skip nếu unit hiện tại chưa được hoàn thành bằng tay
  const skipLesson = !allPreviousUnitsCompleted
    ? lessons.find((lesson) => lesson.skip && !lesson.completed)
    : undefined;

  const normalLessons = lessons.filter((lesson) => !lesson.skip);
  const totalCount = normalLessons.length - 1;

  return (
    <>
      <UnitBanner title={title} description={description} part={order} />
      <div className="relative flex flex-col items-center">
        {/* skip */}
        {skipLesson && (
          <LessonButton
            key={skipLesson.id}
            id={skipLesson.id}
            index={-1} // không ảnh hưởng đến logic thứ tự
            totalCount={totalCount}
            current={false}
            locked={false}
            skip={true}
            percentage={activeLessonPercentage} //ĐỂ XEM SAU VÌ KHI OUT THÌ SET LẠI 0% CHỨ KHÔNG LƯU PROGRESS
            hearts={hearts}
            hasActiveSubscription={hasActiveSubscription}
            lastHeartLoss={lastHeartLoss}
          />
        )}

        {/* bài học bình thường */}
        {normalLessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={totalCount}
              current={isCurrent}
              locked={isLocked}
              skip={false}
              percentage={activeLessonPercentage}
              hearts={hearts}
              hasActiveSubscription={hasActiveSubscription}
              lastHeartLoss={lastHeartLoss}
            />
          );
        })}
      </div>
    </>
  );
};