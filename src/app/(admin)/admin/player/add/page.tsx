"use client";

import Input from "@/app/components/Input";
import ReturnButton from "@/app/components/ReturnButton";
import { add } from "@/fetch-helper/CRUD";
import {
  ClubCreation,
  LeagueCreation,
  PlayerCreation,
} from "@/types/creationTypes";
import { ClubSchema, LeagueSchema, PlayerSchema } from "@/validators/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Club, League, Player } from "@prisma/client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const AddPlayerPage = () => {
  const [newPlayerName, setNewPlayerNameewClubName] = useState("");
  const [errorText, setErrorText] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlayerCreation>({ resolver: zodResolver(PlayerSchema) });

  const onSubmit: SubmitHandler<PlayerCreation> = async (data) => {
    // {
    //   firstName: "Bukayo",
    //   lastName: "Saka",
    //   dateOfBirth: new Date(2001, 8, 5),
    //   position: "striker",
    //   dressNumber: 7,
    //   pictureURL:
    //     "https://cdn.shopify.com/s/files/1/0025/8863/9289/files/11-14_480x480.png?v=1661415004",
    //   currentClubId: arsenalId,
    // },

    const newPlayer = await add<PlayerCreation, Player>("club", data);
    if (newPlayer == null) {
      setErrorText("Club with this names already exists");
      setTimeout(() => setErrorText(""), 3000);
      return;
    }
    reset();
    setNewPlayerNameewClubName(newPlayer.firstName + newPlayer.lastName);
    setTimeout(() => setNewPlayerNameewClubName(""), 3000);
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
          name="position"
          label="Position"
          register={register}
          placeholder="e.g. striker"
          errorMessage={errors?.position?.message}
        />
        <Input
          name="dressNumber"
          label="Dress number"
          register={register}
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
      {newPlayerName && (
        <div className="toast toast-center mb-20">
          <div className="alert border-0 bg-secondary-color shadow-md">
            <span>Club {newPlayerName} created.</span>
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
