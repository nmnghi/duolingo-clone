import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import {
  units,
  lessons,
  challenges,
  challengeProgress,
} from "@/db/schema";
import { eq, and, inArray, lt } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { unitId } = await req.json();
  const { userId } = await auth();

  if (!userId || !unitId) {
    return new NextResponse("Unauthorized or missing unitId", { status: 400 });
  }

  // 1. Lấy unit hiện tại
  const currentUnit = await db.query.units.findFirst({
    where: eq(units.id, unitId),
  });

  if (!currentUnit) {
    return new NextResponse("Unit not found", { status: 404 });
  }

  // 2. Lấy unit trước trong cùng course (để đánh dấu hoàn thành)
  const previousUnit = await db.query.units.findFirst({
    where: and(
      eq(units.courseId, currentUnit.courseId),
      lt(units.order, currentUnit.order)
    ),
    orderBy: (units, { desc }) => [desc(units.order)],
  });

  // 3. Lấy challenges trong unit trước
  const previousChallengeIds = previousUnit
    ? (
      await db.query.lessons.findMany({
        where: eq(lessons.unitId, previousUnit.id),
        with: { challenges: true },
      })
    ).flatMap((lesson) => lesson.challenges.map((c) => c.id))
    : [];

  // 4. Lấy challenges trong bài skip (nếu có) trong current unit
  const skipChallengeIds = (
    await db.query.lessons.findMany({
      where: and(
        eq(lessons.unitId, unitId),
        eq(lessons.skip, true)
      ),
      with: { challenges: true },
    })
  ).flatMap((lesson) => lesson.challenges.map((c) => c.id));

  // 5. Gộp tất cả challenge cần đánh dấu là completed
  const allChallengeIds = [...previousChallengeIds, ...skipChallengeIds];

  if (allChallengeIds.length === 0) {
    return new NextResponse("No challenges to complete", { status: 200 });
  }

  // 6. Xoá các bản ghi cũ & chèn bản ghi hoàn thành
  await db.delete(challengeProgress).where(
    and(
      eq(challengeProgress.userId, userId),
      inArray(challengeProgress.challengeId, allChallengeIds)
    )
  );

  await db.insert(challengeProgress).values(
    allChallengeIds.map((challengeId) => ({
      userId,
      challengeId,
      completed: true,
    }))
  );

  return new NextResponse("Success", { status: 200 });
}
