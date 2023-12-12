import { getAgeLimit } from "@/utils/date";
import { z } from "zod";

export const LeagueSchema = z.object({
  name: z.string().min(1, "League name can't be empty"),
  countryCode: z.string(),
});

export const LeagueSeasonSchema = z.object({
  year: z
    .number({
      invalid_type_error: "Please fill in a number",
    })
    .min(1870, "Year must be greater than 1870")
    .max(2050, "Year must be less than 2050"),
  leagueId: z.string(), // Foreign key
});

export const ClubSchema = z.object({
  name: z.string().min(1, "Name can't be empty"),
  logoURL: z
    .string()
    .url("Invalid URL")
    .regex(/\.(jpg|jpeg|png)$/i, "Must end with .jpg, .jpeg or .png"),
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
  plusMinute: z.number().nullable(),
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
  firstName: z.string().min(1, "First name can't be empty"),
  lastName: z.string().min(1, "Last name can't be empty"),
  dateOfBirth: z
    .date()
    .max(getAgeLimit(15), { message: "Player is too young" }),
  position: z.string(),
  dressNumber: z
    .number({
      invalid_type_error: "Please fill in a number",
    })
    .min(1, "Number must be between 1 and 99")
    .max(99, "Number must be between 1 and 99"),
  pictureURL: z
    .string()
    .url("Invalid URL")
    .regex(/\.(jpg|jpeg|png)$/i, "Must end with .jpg, .jpeg or .png"),
  currentClubId: z.string().min(1, "Player's team must be selected"), // Foreign key
});

export const PlayerSeasonSchema = z.object({
  playerId: z.string(), // Foreign key
  clubSeasonId: z.string(), // Foreign key
  goalCount: z.number(),
});

export const AdminLoginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Please enter your password"),
});
