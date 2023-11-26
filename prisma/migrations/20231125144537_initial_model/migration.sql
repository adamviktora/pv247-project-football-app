-- CreateTable
CREATE TABLE "League" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LeagueSeason" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" INTEGER NOT NULL,
    "leagueId" TEXT NOT NULL,
    CONSTRAINT "LeagueSeason_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Club" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logoURL" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventDate" DATETIME NOT NULL,
    "leagueSeasonId" TEXT NOT NULL,
    "round" INTEGER NOT NULL,
    "homeClubId" TEXT NOT NULL,
    "awayClubId" TEXT NOT NULL,
    "homeClubGoalCount" INTEGER,
    "awayClubGoalCount" INTEGER,
    CONSTRAINT "Game_homeClubId_fkey" FOREIGN KEY ("homeClubId") REFERENCES "Club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Game_awayClubId_fkey" FOREIGN KEY ("awayClubId") REFERENCES "Club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "minute" INTEGER NOT NULL,
    "plusMinute" INTEGER NOT NULL,
    "isOwnGoal" BOOLEAN NOT NULL,
    "isPenalty" BOOLEAN NOT NULL,
    "playerId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "clubScoredId" TEXT NOT NULL,
    "clubReceivedId" TEXT NOT NULL,
    CONSTRAINT "Goal_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Goal_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Goal_clubScoredId_fkey" FOREIGN KEY ("clubScoredId") REFERENCES "Club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Goal_clubReceivedId_fkey" FOREIGN KEY ("clubReceivedId") REFERENCES "Club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClubSeason" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gamesPlayedCount" INTEGER NOT NULL,
    "gamesWonCount" INTEGER NOT NULL,
    "gamesDrawnCount" INTEGER NOT NULL,
    "gamesLostCount" INTEGER NOT NULL,
    "goalsScoredCount" INTEGER NOT NULL,
    "goalsReceivedCount" INTEGER NOT NULL,
    "clubId" TEXT NOT NULL,
    "leagueSeasonId" TEXT NOT NULL,
    CONSTRAINT "ClubSeason_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClubSeason_leagueSeasonId_fkey" FOREIGN KEY ("leagueSeasonId") REFERENCES "LeagueSeason" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "position" TEXT NOT NULL,
    "pictureURL" TEXT NOT NULL,
    "currentClubId" TEXT NOT NULL,
    CONSTRAINT "Player_currentClubId_fkey" FOREIGN KEY ("currentClubId") REFERENCES "Club" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlayerSeason" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerId" TEXT NOT NULL,
    "clubSeasonId" TEXT NOT NULL,
    CONSTRAINT "PlayerSeason_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerSeason_clubSeasonId_fkey" FOREIGN KEY ("clubSeasonId") REFERENCES "ClubSeason" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
