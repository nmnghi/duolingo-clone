import { getCourses } from "@/db/queries";
import { getUserProgress } from "@/db/queries";
import ListWrapper from "./list-wrapper";
import LanguageSwitcherWrapper from "@/components/language-switcher-wrapper";
import CoursesTitle from "./courses-title";

const CoursesPage = async() => {
   const coursesData = getCourses();
   const userProgressData = getUserProgress();
   
   const [
    courses,
    userProgress,
   ] = await Promise.all([
    coursesData,
    userProgressData,
   ]);

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <div className="flex justify-end py-2">
        <LanguageSwitcherWrapper />
      </div>
      <CoursesTitle />
      <ListWrapper
        courses={courses}
        activeCourseId={userProgress?.activeCourseId}
      />
    </div>
  );
};

export default CoursesPage;