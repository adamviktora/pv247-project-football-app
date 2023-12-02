import { GoalCreation } from "@/types/creationTypes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addGoal = async (goal: GoalCreation) => {
  const newGoal = await prisma.goal.create({
    data: goal,
  });
  return newGoal;
};
