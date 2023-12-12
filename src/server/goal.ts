import { GoalCreation } from "@/types/creationTypes";
import { prisma } from "./prisma";

export const addGoal = async (goal: GoalCreation) => {
  const newGoal = await prisma.goal.create({
    data: goal,
  });
  return newGoal;
};
