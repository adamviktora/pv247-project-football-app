import { z } from "zod";

export const LeagueSchema = z.object({
  name: z.string(),
  countryCode: z.string(),
});

export const LeagueSeasonSchema = z.object({
  year: z.number(),
  leagueId: z.string(), // Foreign key
});

export const ClubSchema = z.object({
  name: z.string(),
  logoURL: z.string(),
  countryCode: z.string(),
});

export const GameSchema = z.object({
  eventDate: z.date(),
  round: z.number(),
  homeClubId: z.string(), // Foreign key
  awayClubId: z.string(), // Foreign key
  homeClubGoalCount: z.number().nullable(),
  awayClubGoalCount: z.number().nullable(),
  leagueSeasonId: z.string(), // Foreign key
});

export const GoalSchema = z.object({
  minute: z.number(),
  plusMinute: z.number(),
  isOwnGoal: z.boolean(),
  isPenalty: z.boolean(),
  playerId: z.string(), // Foreign key
  gameId: z.string(), // Foreign key
  clubScoredId: z.string(), // Foreign key
  clubReceivedId: z.string(), // Foreign key
});

export const ClubSeasonSchema = z.object({
  order: z.number().min(1),
  points: z.number(),
  gamesPlayedCount: z.number(),
  gamesWonCount: z.number(),
  gamesDrawnCount: z.number(),
  gamesLostCount: z.number(),
  goalsScoredCount: z.number(),
  goalsReceivedCount: z.number(),
  clubId: z.string(), // Foreign key
  leagueSeasonId: z.string(), // Foreign key
});

export const PlayerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.date(),
  position: z.string(),
  dressNumber: z.number().min(1).max(99),
  pictureURL: z.string(),
  currentClubId: z.string(), // Foreign key
});

export const PlayerSeasonSchema = z.object({
  playerId: z.string(), // Foreign key
  clubSeasonId: z.string(), // Foreign key
});
