"use client";

import Input from "@/app/components/Input";
import ReturnButton from "@/app/components/ReturnButton";
import LeagueOptions from "@/app/components/server-components/LeagueOptions";
import { add, getAll } from "@/fetch-helper/CRUD";
import { LeagueSeasonCreation } from "@/types/creationTypes";
import { LeagueSeasonSchema } from "@/validators/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { League, LeagueSeason } from "@prisma/client";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const getLeagues = async () => {
      const leagues = await getAll<League>("league");
      setLeagues(leagues);
    };
    getLeagues();
  }, []);

  const onSubmit: SubmitHandler<LeagueSeasonCreation> = async (data) => {
    console.log(data);
    const newSeason = await add<LeagueSeasonCreation, LeagueSeason>(
      "leagueSeason",
      data,
    );
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
            setValueAs: (value: string) => Number(value),
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
              className="select m-auto block w-full bg-gray-300 font-semibold text-black focus:border-none"
            >
              <LeagueOptions leagues={leagues} />
            </select>
          ) : (
            <span className="loading loading-dots loading-md"></span>
          )}
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
    </div>
  );
};

export default AddSeasonPage;
