import {
  AdminLoginSchema,
  ClubSchema,
  ClubSeasonSchema,
  GameSchema,
  GoalSchema,
  LeagueSchema,
  LeagueSeasonSchema,
  PlayerSchema,
  PlayerSeasonSchema,
} from "@/validators/schema";
import z from "zod";

export type ClubCreation = z.infer<typeof ClubSchema>;
export type ClubSeasonCreation = z.infer<typeof ClubSeasonSchema>;
export type GameCreation = z.infer<typeof GameSchema>;
export type GoalCreation = z.infer<typeof GoalSchema>;
export type LeagueCreation = z.infer<typeof LeagueSchema>;
export type LeagueSeasonCreation = z.infer<typeof LeagueSeasonSchema>;
export type PlayerCreation = z.infer<typeof PlayerSchema>;
export type PlayerSeasonCreation = z.infer<typeof PlayerSeasonSchema>;

export type GameWithGoalsCreation = GameCreation & {
  goals: Omit<GoalCreation, "gameId">[];
};

export type AdminLogin = z.infer<typeof AdminLoginSchema>;
