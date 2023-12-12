-- CreateTable
CREATE TABLE "League" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeagueSeason" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "leagueId" TEXT NOT NULL,

    CONSTRAINT "LeagueSeason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Club" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoURL" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "leagueSeasonId" TEXT NOT NULL,
    "round" INTEGER NOT NULL,
    "homeClubId" TEXT NOT NULL,
    "awayClubId" TEXT NOT NULL,
    "homeClubGoalCount" INTEGER,
    "awayClubGoalCount" INTEGER,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "minute" INTEGER NOT NULL,
    "plusMinute" INTEGER,
    "isOwnGoal" BOOLEAN NOT NULL,
    "isPenalty" BOOLEAN NOT NULL,
    "playerId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "clubScoredId" TEXT NOT NULL,
    "clubReceivedId" TEXT NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClubSeason" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "gamesPlayedCount" INTEGER NOT NULL,
    "gamesWonCount" INTEGER NOT NULL,
    "gamesDrawnCount" INTEGER NOT NULL,
    "gamesLostCount" INTEGER NOT NULL,
    "goalsScoredCount" INTEGER NOT NULL,
    "goalsReceivedCount" INTEGER NOT NULL,
    "clubId" TEXT NOT NULL,
    "leagueSeasonId" TEXT NOT NULL,

    CONSTRAINT "ClubSeason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "position" TEXT NOT NULL,
    "dressNumber" INTEGER NOT NULL,
    "pictureURL" TEXT NOT NULL,
    "currentClubId" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerSeason" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "clubSeasonId" TEXT NOT NULL,
    "goalCount" INTEGER NOT NULL,

    CONSTRAINT "PlayerSeason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "LeagueSeason" ADD CONSTRAINT "LeagueSeason_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_leagueSeasonId_fkey" FOREIGN KEY ("leagueSeasonId") REFERENCES "LeagueSeason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_homeClubId_fkey" FOREIGN KEY ("homeClubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_awayClubId_fkey" FOREIGN KEY ("awayClubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_clubScoredId_fkey" FOREIGN KEY ("clubScoredId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_clubReceivedId_fkey" FOREIGN KEY ("clubReceivedId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubSeason" ADD CONSTRAINT "ClubSeason_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClubSeason" ADD CONSTRAINT "ClubSeason_leagueSeasonId_fkey" FOREIGN KEY ("leagueSeasonId") REFERENCES "LeagueSeason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_currentClubId_fkey" FOREIGN KEY ("currentClubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerSeason" ADD CONSTRAINT "PlayerSeason_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerSeason" ADD CONSTRAINT "PlayerSeason_clubSeasonId_fkey" FOREIGN KEY ("clubSeasonId") REFERENCES "ClubSeason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
