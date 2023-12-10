"use client";

import Input from "@/app/components/Input";
import ReturnButton from "@/app/components/ReturnButton";
import LeagueOptions from "@/app/components/server-components/LeagueOptions";
import { add, getAll } from "@/fetch-helper/CRUD";
import { PlayerPosition } from "@/seeding/player";
import { PlayerCreation } from "@/types/creationTypes";
import { PlayerSchema } from "@/validators/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Club, League, LeagueSeason, Player } from "@prisma/client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const AddPlayerPage = () => {
  const [newPlayerName, setNewPlayerNameewClubName] = useState("");
  const [errorText, setErrorText] = useState("");

  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedLeagueId, setSelectedLeague] = useState<string>("");

  const [clubs, setClubs] = useState<Club[]>([]);
  const [currentClubId, setCurrentClubId] = useState<string>("");

  currentClubId;

  useEffect(() => {
    const getLeagues = async () => {
      const leagues = await getAll<League>("league");
      setLeagues(leagues);
      setSelectedLeague(leagues[0].id);
    };
    getLeagues();
  }, []);

  useEffect(() => {
    const getClubs = async () => {
      console.log("Selected value has changed:", selectedLeagueId);
      const response = await fetch(
        `/api/leagueSeason?leagueId=${selectedLeagueId}`,
      );

      const seasons: LeagueSeason[] = await response.json();

      if (seasons.length) {
        const fetchedId = seasons[0].id;

        const club_response = await fetch(
          `/api/club?leagueSeasonId=${fetchedId}`,
        );
        const clubs: Club[] = await club_response.json();
        console.log(clubs);
        setClubs(clubs);
      } else {
        setClubs([]);
      }
    };
    getClubs();
  }, [selectedLeagueId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlayerCreation>({ resolver: zodResolver(PlayerSchema) });

  const onSubmit: SubmitHandler<PlayerCreation> = async (data) => {
    const newPlayer = await add<PlayerCreation, Player>("player", data);
    if (newPlayer == null) {
      setErrorText("Club with this names already exists");
      setTimeout(() => setErrorText(""), 3000);
      return;
    }
    reset();
    setNewPlayerNameewClubName(newPlayer.firstName + newPlayer.lastName);
    setTimeout(() => setNewPlayerNameewClubName(""), 3000);
  };

  return (
    <div>
      <div className="relative">
        <ReturnButton standalone />
      </div>
      <h1 className="my-7 text-center text-3xl">Add Player</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto flex max-w-xs flex-col gap-2"
      >
        <Input
          name="firstName"
          label="First name:"
          register={register}
          placeholder="e.g. John"
          errorMessage={errors?.firstName?.message}
        />
        <Input
          name="lastName"
          label="First name"
          register={register}
          placeholder="e.g. Doe"
          errorMessage={errors?.lastName?.message}
        />
        <Input
          name="dateOfBirth"
          label="Date of birth"
          register={register}
          errorMessage={errors?.dateOfBirth?.message}
        />
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-black">Position</span>
          </div>
          <select
            {...register("position")}
            className="select m-auto block w-full bg-gray-300 font-semibold text-black focus:border-none"
          >
            {Object.values(PlayerPosition).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <Input
          name="dressNumber"
          label="Dress number"
          register={register}
          validationOptions={{
            setValueAs: (value: string) => Number(value),
          }}
          placeholder="e.g. 68"
          errorMessage={errors?.dressNumber?.message}
        />
        <Input
          name="pictureURL"
          label="Picture url"
          register={register}
          placeholder="https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/Headshot_Saka_1510x850_0.jpg"
          errorMessage={errors?.pictureURL?.message}
        />
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-black">League</span>
          </div>
          {leagues.length ? (
            <select
              className="select m-auto block w-full bg-gray-300 font-semibold text-black focus:border-none"
              onChange={(event) => {
                setSelectedLeague(event.target.value);
              }}
            >
              <LeagueOptions leagues={leagues} />
            </select>
          ) : (
            <span className="loading loading-dots loading-md"></span>
          )}
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-black">Club</span>
          </div>
          {/* TODO: Fix bug, when currentClubId is selected only after click */}
          <select
            {...register("currentClubId")}
            className="select m-auto block w-full bg-gray-300 font-semibold text-black focus:border-none"
          >
            {clubs.length ? (
              clubs.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.name}
                </option>
              ))
            ) : (
              <option key={"nope"} value="">
                No clubs
              </option>
            )}
          </select>
          {errors?.currentClubId?.message && (
            <div className="label">
              <span className="label-text-alt text-red-700">
                {errors?.currentClubId?.message}
              </span>
            </div>
          )}
        </label>
        <button className="btn btn-primary mt-6 text-white">Add</button>
      </form>
      {newPlayerName && (
        <div className="toast toast-center mb-20">
          <div className="alert border-0 bg-secondary-color shadow-md">
            <span>Player {newPlayerName} created.</span>
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

export default AddPlayerPage;
