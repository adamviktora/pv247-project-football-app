"use client";

import Input from "@/app/components/Input";
import ReturnButton from "@/app/components/ReturnButton";
import LeagueOptions from "@/app/components/server-components/LeagueOptions";
import { add, getAll } from "@/fetch-helper/CRUD";
import {
  ClubSeasonCreation,
  LeagueSeasonCreation,
} from "@/types/creationTypes";
import { LeagueSeasonSchema } from "@/validators/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Club, ClubSeason, League, LeagueSeason } from "@prisma/client";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const AddSeasonPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeagueSeasonCreation>({
    resolver: zodResolver(LeagueSeasonSchema),
  });

  const [newSeasonYear, setNewSeasonYear] = useState<number | null>(null);
  const [leagues, setLeagues] = useState<League[]>([]);

  const [clubs, setClubs] = useState<Club[]>([]);
  // const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([]);

  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);

  const handleCheckboxChange = (clubId: string) => {
    // Check if the clubId is already in the selectedClubs array
    if (selectedClubs.includes(clubId)) {
      // If it is, remove it
      setSelectedClubs(selectedClubs.filter((id) => id !== clubId));
    } else {
      // If it's not, add it to the selectedClubs array
      setSelectedClubs([...selectedClubs, clubId]);
    }
  };

  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const getLeagues = async () => {
      const leagues = await getAll<League>("league");
      setLeagues(leagues);
      loadClubs(leagues[0].countryCode);
    };
    getLeagues();
  }, []);

  const handleLeagueChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedClubs([]);
    const selectedLeagueId = event.target.value;
    const leagueCountryCode = leagues.find(
      (league) => league.id == selectedLeagueId,
    )?.countryCode as string;
    loadClubs(leagueCountryCode);
  };

  const loadClubs = async (leagueCountryCode: string) => {
    const response = await fetch(`/api/club?countryCode=${leagueCountryCode}`);

    const clubs: Club[] = await response.json();
    setClubs(clubs);
  };

  const onSubmit: SubmitHandler<LeagueSeasonCreation> = async (data) => {
    console.log(data);
    const newSeason = await add<LeagueSeasonCreation, LeagueSeason>(
      "leagueSeason",
      data,
    );
    if (newSeason == null) {
      setErrorText("Season with this league and year already exists");
      setTimeout(() => setErrorText(""), 3000);
      return;
    }

    selectedClubs.forEach((clubId) => {
      const newClubSeason: ClubSeasonCreation = {
        order: 0,
        points: 0,
        gamesPlayedCount: 0,
        gamesWonCount: 0,
        gamesDrawnCount: 0,
        gamesLostCount: 0,
        goalsReceivedCount: 0,
        goalsScoredCount: 0,
        clubId: clubId,
        leagueSeasonId: newSeason.id,
      };

      const createClubSeason = async (clubSeason: ClubSeasonCreation) => {
        const createdClubSeason = await add<ClubSeasonCreation, ClubSeason>(
          "clubSeason",
          clubSeason,
        );
        console.log("Created club season with id: ", createdClubSeason.id);
      };
      createClubSeason(newClubSeason);
    });

    reset();
    setNewSeasonYear(newSeason.year);
    setTimeout(() => setNewSeasonYear(null), 3000);
  };

  return (
    <div>
      <div className="relative">
        <ReturnButton standalone />
      </div>
      <h1 className="my-7 text-center text-3xl">Add season to a league</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto flex max-w-xs flex-col gap-2"
      >
        <Input
          name="year"
          register={register}
          validationOptions={{
            valueAsNumber: true,
          }}
          label="Year"
          placeholder={`e.g. ${new Date().getFullYear()}`}
          errorMessage={errors?.year?.message}
        />
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-black">League</span>
          </div>
          {leagues.length ? (
            <select
              {...register("leagueId")}
              onChange={handleLeagueChange}
              className="select m-auto block w-full bg-gray-300 font-semibold text-black focus:border-none"
            >
              <LeagueOptions leagues={leagues} />
            </select>
          ) : (
            <span className="loading loading-dots loading-md"></span>
          )}
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-black">Clubs</span>
          </div>
          <div className="max-h-64 overflow-x-auto">
            {clubs.length ? (
              clubs.map((club, index) => (
                <div
                  key={club.id}
                  className={`form-control ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-200"
                  }`}
                >
                  <label className="label cursor-pointer">
                    <span className="label-text">{club.name}</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={() => handleCheckboxChange(club.id)}
                      checked={selectedClubs.includes(club.id)}
                    />
                  </label>
                </div>
              ))
            ) : (
              <span>No clubs</span>
            )}
          </div>
        </label>
        <button className="btn btn-primary mt-6 text-white">Add</button>
      </form>
      {newSeasonYear && (
        <div className="toast toast-center mb-20">
          <div className="alert border-0 bg-secondary-color shadow-md">
            <span>
              Season {newSeasonYear}/{newSeasonYear + 1} created.
            </span>
          </div>
        </div>
      )}
      {errorText && (
        <div className="toast toast-center mb-20">
          <div className="alert border-0 bg-red-400 shadow-md">
            <span>{errorText}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSeasonPage;
