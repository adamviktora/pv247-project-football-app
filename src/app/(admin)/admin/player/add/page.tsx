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
  const [newPlayerName, setNewPlayerName] = useState("");
  const [errorText, setErrorText] = useState("");

  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedLeagueId, setSelectedLeagueId] = useState<string>("");
  const [clubs, setClubs] = useState<Club[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<PlayerCreation>({ resolver: zodResolver(PlayerSchema) });

  useEffect(() => {
    const getLeagues = async () => {
      const leagues = await getAll<League>("league");
      setLeagues(leagues);
      setSelectedLeagueId(leagues[0].id);
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
        const club_response = await fetch(
          `/api/club?leagueSeasonId=${seasons[0].id}`,
        );
        const clubs: Club[] = await club_response.json();
        setClubs(clubs);
        setValue("currentClubId", clubs[0]?.id ?? "");
      } else {
        setClubs([]);
        setValue("currentClubId", "");
      }
    };
    getClubs();
  }, [selectedLeagueId, setValue]);

  const onSubmit: SubmitHandler<PlayerCreation> = async (data) => {
    const newPlayer = await add<PlayerCreation, Player>("player", data);

    if (newPlayer == null) {
      setErrorText(
        `This club already has a player named ${data.firstName} ${data.lastName}`,
      );
      setTimeout(() => setErrorText(""), 3000);
      return;
    }
    reset();
    setNewPlayerName(`${newPlayer.firstName} ${newPlayer.lastName}`);
    setTimeout(() => setNewPlayerName(""), 3000);
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
          label="First name"
          register={register}
          placeholder="e.g. John"
          errorMessage={errors?.firstName?.message}
        />
        <Input
          name="lastName"
          label="Last name"
          register={register}
          placeholder="e.g. Doe"
          errorMessage={errors?.lastName?.message}
        />

        <label>
          <div className="label">
            <span className="label-text text-black">Date of birth</span>
          </div>
          <input
            {...register("dateOfBirth", {
              valueAsDate: true,
            })}
            type="date"
            id="datePicker"
            className="w-full rounded-full border-[1px] border-gray-300 bg-transparent px-4 py-3 outline-2 outline-offset-2 outline-gray-300 focus:outline focus:ring-0"
          />
          {errors?.dateOfBirth?.message && (
            <div className="label">
              <span className="label-text-alt text-red-700">
                {errors?.dateOfBirth?.message}
              </span>
            </div>
          )}
        </label>
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
            valueAsNumber: true,
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
                setSelectedLeagueId(event.target.value);
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
      {newPlayerName !== "" && (
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
