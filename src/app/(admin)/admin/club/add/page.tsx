"use client";

import Input from "@/app/components/Input";
import ReturnButton from "@/app/components/ReturnButton";
import { add } from "@/fetch-helper/CRUD";
import { ClubCreation, LeagueCreation } from "@/types/creationTypes";
import { ClubSchema, LeagueSchema } from "@/validators/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Club, League } from "@prisma/client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const AddClubPage = () => {
  const [newClubName, setNewClubName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClubCreation>({ resolver: zodResolver(ClubSchema) });

  const onSubmit: SubmitHandler<ClubCreation> = async (data) => {
    // TODO: Check if club name already exists in add function
    const newClub = await add<ClubCreation, Club>("club", data);
    reset();
    setNewClubName(newClub.name);
    setTimeout(() => setNewClubName(""), 3000);
  };

  const countryOptions = [
    // TODO: Move somewhere
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
      <h1 className="my-7 text-center text-3xl">Add Club</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto flex max-w-xs flex-col gap-2"
      >
        <Input
          name="name"
          label="Name"
          register={register}
          placeholder="e.g. Arsenal"
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
        <Input
          name="logoURL"
          label="Logo url"
          register={register}
          placeholder="https://upload.wikimedia.org/wikipedia/hif/8/82/Arsenal_FC.png"
          errorMessage={errors?.logoURL?.message}
        />
        <button className="btn btn-primary mt-6 text-white">Add</button>
      </form>
      {newClubName && (
        <div className="toast toast-center mb-20">
          <div className="alert border-0 bg-secondary-color shadow-md">
            <span>Club {newClubName} created.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddClubPage;
