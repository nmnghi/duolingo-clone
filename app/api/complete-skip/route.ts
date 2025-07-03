import { auth } from "@clerk/nextjs/server";
import { db } from "@/db/drizzle";
import { units, lessons, challenges, challengeProgress } from "@/db/schema";
import { eq, and, inArray, lt } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { unitId } = await req.json();
  const { userId } = await auth();

  if (!userId || !unitId) {
    return new NextResponse("Unauthorized or missing unitId", { status: 400 });
  }

  // 1. Lấy thông tin unit hiện tại
  const currentUnit = await db.query.units.findFirst({
    where: eq(units.id, unitId),
  });

  if (!currentUnit) {
    return new NextResponse("Unit not found", { status: 404 });
  }

  // 2. Tìm unit trước đó cùng course
  const previousUnit = await db.query.units.findFirst({
    where: and(
      eq(units.courseId, currentUnit.courseId),
      lt(units.order, currentUnit.order)
    ),
    orderBy: (units, { desc }) => [desc(units.order)],
  });

  if (!previousUnit) {
    return new NextResponse("No previous unit", { status: 200 });
  }

  // 3. Lấy lesson & challenges trong unit trước đó
  const previousLessons = await db.query.lessons.findMany({
    where: eq(lessons.unitId, previousUnit.id),
    with: { challenges: true },
  });

  const challengeIds = previousLessons.flatMap((lesson) =>
    lesson.challenges.map((c) => c.id)
  );

  if (challengeIds.length === 0) {
    return new NextResponse("No challenges found", { status: 200 });
  }

  // 4. Xoá & insert lại challenge_progress
  await db.delete(challengeProgress).where(
    and(
      eq(challengeProgress.userId, userId),
      inArray(challengeProgress.challengeId, challengeIds)
    )
  );

  await Promise.all(
    challengeIds.map((challengeId) =>
      db.insert(challengeProgress).values({
        userId,
        challengeId,
        completed: true,
      })
    )
  );

  return new NextResponse("Success", { status: 200 });
}
