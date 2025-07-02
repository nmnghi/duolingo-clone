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
};

export const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
    
  const skipLesson = lessons.find((lesson) => lesson.skip);
  const normalLessons = lessons.filter((lesson) => !lesson.skip);
  const totalCount = normalLessons.length - 1;

  return (
    <>
      <UnitBanner title={title} description={description} />
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
            />
          );
        })}
      </div>
    </>
  );
};
