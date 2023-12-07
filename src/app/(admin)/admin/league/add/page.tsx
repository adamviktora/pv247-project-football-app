"use client";

import Input from "@/app/components/Input";
import ReturnButton from "@/app/components/ReturnButton";
import { add } from "@/fetch-helper/CRUD";
import { LeagueCreation } from "@/types/creationTypes";
import { LeagueSchema } from "@/validators/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { League } from "@prisma/client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const AddLeaguePage = () => {
  const [newLeagueName, setNewLeagueName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeagueCreation>({ resolver: zodResolver(LeagueSchema) });

  const onSubmit: SubmitHandler<LeagueCreation> = async (data) => {
    const newLeague = await add<LeagueCreation, League>("league", data);
    reset();
    setNewLeagueName(newLeague.name);
    setTimeout(() => setNewLeagueName(""), 3000);
  };

  const countryOptions = [
    { value: "ENG", label: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England" },
    { value: "ESP", label: "🇪🇸 Spain" },
    { value: "GER", label: "🇩🇪 Germany" },
    { value: "ITA", label: "🇮🇹 Italy" },
    { value: "FRA", label: "🇫🇷 France" },
    { value: "POR", label: "🇵🇹 Portugal" },
    { value: "NED", label: "🇳🇱 Netherlands" },
    { value: "BEL", label: "🇧🇪 Belgium" },
    { value: "ARG", label: "🇦🇷 Argentina" },
  ];

  const label = "Name";

  return (
    <div>
      <div className="relative">
        <ReturnButton standalone />
      </div>
      <h1 className="my-7 text-center text-3xl">Add League</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto flex max-w-xs flex-col gap-2"
      >
        <Input
          name="name"
          label="Name"
          register={register}
          placeholder="e.g. Bundesliga"
          errorMessage={errors?.name?.message}
        />
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-black">Country</span>
          </div>
          <select
            {...register("countryCode")}
            className="select m-auto block w-full bg-gray-300 font-semibold text-black focus:border-none"
          >
            {countryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <button className="btn btn-primary mt-6 text-white">Add</button>
      </form>
      {newLeagueName && (
        <div className="toast toast-center mb-20">
          <div className="alert border-0 bg-secondary-color shadow-md">
            <span>League {newLeagueName} created.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLeaguePage;
