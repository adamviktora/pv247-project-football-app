"use client";

import Input from "@/app/components/Input";
import Loading from "@/app/components/Loading";
import ReturnButton from "@/app/components/ReturnButton";
import ClubOptions from "@/app/components/server-components/ClubOptions";
import LeagueOptions from "@/app/components/server-components/LeagueOptions";
import SeasonOptions from "@/app/components/server-components/SeasonOptions";
import { add, getAll, getAllFilteredById } from "@/fetch-helper/CRUD";
import { GameCreation } from "@/types/creationTypes";
import { GameSchema } from "@/validators/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Club, Game, League, LeagueSeason } from "@prisma/client";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const AddGamePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    setError,
    control,
  } = useForm<GameCreation>({ resolver: zodResolver(GameSchema) });

  const [selectedLeagueId, setSelectedLeagueId] = useState("");
  const [selectedSeasonId, setSelectedSeasonId] = useState("");
  const [leagues, setLeagues] = useState<League[] | null>(null);
  const [seasons, setSeasons] = useState<LeagueSeason[] | null>(null);
  const [clubs, setClubs] = useState<Club[] | null>(null);
  const [showGameCreated, setShowGameCreated] = useState(false);

  useEffect(() => {
    const getLeagues = async () => {
      const leagues = await getAll<League>("league");
      setLeagues(leagues);
      setSelectedLeagueId(leagues[0]?.id ?? "");
    };
    getLeagues();
  }, []);

  useEffect(() => {
    const getSeasons = async () => {
      const seasons = await getAllFilteredById<LeagueSeason>(
        "leagueSeason",
        "league",
        selectedLeagueId,
      );
      setSeasons(seasons);
      setSelectedSeasonId(seasons[0]?.id ?? "");
    };
    getSeasons();
  }, [selectedLeagueId]);

  useEffect(() => {
    console.log(selectedSeasonId);

    const getClubs = async () => {
      const clubs = await getAllFilteredById<Club>(
        "club",
        "leagueSeason",
        selectedSeasonId,
      );
      setClubs(clubs);
      if (clubs.length >= 2) {
        setValue("homeClubId", clubs[0].id);
        setValue("awayClubId", clubs[1].id);
      }
    };
    getClubs();
  }, [selectedSeasonId, setValue]);

  const onSubmit: SubmitHandler<GameCreation> = async (data: any) => {
    console.log(selectedSeasonId);
    console.log(data);

    if (data.homeClubId === data.awayClubId) {
      setError("awayClubId", {
        message: "Home Club and Away Club should be different",
      });
      return;
    }

    const createdGame = await add<GameCreation, Game>("game", {
      ...data,
      leagueSeasonId: selectedSeasonId,
    });
    console.log(createdGame);

    setShowGameCreated(true);
    setTimeout(() => setShowGameCreated(false), 3000);
  };

  const LabelWrapper = ({
    label,
    children,
    textRight,
  }: PropsWithChildren<{ label: ReactNode; textRight?: boolean }>) => (
    <label className="form-control w-full max-w-xs">
      <div className={`label ${textRight && "self-end"}`}>
        <span className="label-text text-black">{label}</span>
      </div>
      {children}
    </label>
  );

  return (
    <div className="m-auto">
      <div className="relative">
        <ReturnButton standalone />
      </div>
      <h1 className="my-7 text-center text-3xl">Add Game</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="m-auto flex max-w-xs flex-col gap-2">
          {leagues?.length === 0 ? (
            <div className="text-gray-500">No leagues yet.</div>
          ) : (
            <LabelWrapper label="League">
              {leagues ? (
                <select
                  value={selectedLeagueId}
                  onChange={(e) => setSelectedLeagueId(e.target.value)}
                  className="select m-auto block w-full bg-gray-300 font-semibold text-black focus:border-none"
                >
                  <LeagueOptions leagues={leagues} />
                </select>
              ) : (
                <Loading />
              )}
            </LabelWrapper>
          )}
          {seasons?.length === 0 ? (
            <div className="text-gray-500">No seasons yet.</div>
          ) : (
            <LabelWrapper label="Season">
              {seasons ? (
                <Controller
                  name="leagueSeasonId"
                  control={control}
                  defaultValue={selectedSeasonId}
                  render={({ field }) => (
                    <select
                      {...field}
                      value={selectedSeasonId}
                      onChange={(e) => {
                        field.onChange(e);
                        setSelectedSeasonId(e.target.value);
                      }}
                      className="select m-auto block w-full bg-gray-300 font-semibold text-black focus:border-none"
                    >
                      <SeasonOptions seasons={seasons} />
                    </select>
                  )}
                />
              ) : (
                <Loading />
              )}
            </LabelWrapper>
          )}
        </div>

        {clubs && clubs.length < 2 ? (
          seasons?.length === 0 ? (
            <></>
          ) : (
            <div className="flex justify-center">
              <div className="mt-4 w-[20rem] text-gray-500">
                {clubs.length ? "Not enough clubs." : "No clubs yet."}
              </div>
            </div>
          )
        ) : (
          clubs && (
            <>
              <div className="w-full">
                <div className="m-auto flex w-10/12 flex-col pt-8 md:w-[40rem] lg:w-[56rem]">
                  <div className="flex justify-center">
                    <div className="flex justify-between gap-6 pb-6 max-lg:grow">
                      <Input
                        name="round"
                        register={register}
                        validationOptions={{
                          valueAsNumber: true,
                        }}
                        label="Round"
                        placeholder={"e.g. 1"}
                        errorMessage={errors?.round?.message}
                      />
                      <LabelWrapper label="Date">
                        <input
                          {...register("eventDate", { valueAsDate: true })}
                          type="date"
                          className="w-full rounded-full border-[1px] border-gray-300 bg-transparent px-4 py-3 outline-2 outline-offset-2 outline-gray-300 focus:outline focus:ring-0"
                        />
                        {errors?.eventDate?.message && (
                          <div className="label">
                            <span className="label-text-alt text-red-700">
                              {errors?.eventDate?.message}
                            </span>
                          </div>
                        )}
                      </LabelWrapper>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <LabelWrapper label="Home club">
                      <select
                        {...register("homeClubId")}
                        className="select m-auto block w-full bg-gray-300 font-semibold text-black focus:border-none"
                      >
                        <ClubOptions withoutAllClubsOption clubs={clubs} />
                      </select>
                    </LabelWrapper>
                    <div>
                      <div className="mb-2 text-center">Score</div>
                      <div className="flex w-1/3 items-center justify-center rounded-lg text-3xl font-semibold sm:text-4xl lg:w-[202px]">
                        <input
                          {...register("homeClubGoalCount")}
                          type="text"
                          placeholder="?"
                          className="w-16 rounded-xl bg-transparent py-2 pl-4 outline outline-2 outline-gray-300 placeholder:text-gray-300"
                        />
                        <div className="mx-2">—</div>
                        <input
                          {...register("awayClubGoalCount")}
                          type="text"
                          placeholder="?"
                          className="w-16 rounded-xl bg-transparent py-2 pl-4 outline outline-2 outline-gray-300 placeholder:text-gray-300"
                        />
                      </div>
                      {errors?.homeClubGoalCount?.message && (
                        <div className="label">
                          <span className="label-text-alt text-red-700">
                            {errors?.homeClubGoalCount?.message}
                          </span>
                        </div>
                      )}
                      {errors?.awayClubGoalCount?.message && (
                        <div className="label">
                          <span className="label-text-alt text-red-700">
                            {errors?.awayClubGoalCount?.message}
                          </span>
                        </div>
                      )}
                    </div>
                    <LabelWrapper label="Away club" textRight>
                      <select
                        {...register("awayClubId")}
                        className="select m-auto block w-full bg-gray-300 font-semibold text-black focus:border-none"
                      >
                        <ClubOptions withoutAllClubsOption clubs={clubs} />
                      </select>
                      {errors?.awayClubId?.message && (
                        <div className="label">
                          <span className="label-text-alt text-red-700">
                            {errors?.awayClubId?.message}
                          </span>
                        </div>
                      )}
                    </LabelWrapper>
                  </div>
                </div>
                <div className="mt-8 flex justify-center text-gray-500 max-sm:justify-around max-sm:text-sm sm:gap-56">
                  <ul className="w-36 text-right sm:w-48">goals home adder</ul>
                  <ul className="w-36 sm:w-48">goals away adder</ul>
                </div>
              </div>
              <div className="flex w-full justify-center">
                <div className="flex max-w-xs grow">
                  <button className="btn btn-primary mt-6 w-full text-white">
                    Add
                  </button>
                </div>
              </div>
            </>
          )
        )}
      </form>
      {showGameCreated && (
        <div className="toast toast-center mb-20">
          <div className="alert border-0 bg-secondary-color shadow-md">
            <span>Game created.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddGamePage;
