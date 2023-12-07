"use client";

import Input from "@/app/components/Input";
import { AdminLogin } from "@/types/creationTypes";
import { AdminLoginSchema } from "@/validators/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminLogin>({ resolver: zodResolver(AdminLoginSchema) });

  const router = useRouter();

  const onSubmit: SubmitHandler<AdminLogin> = (data) => {
    router.push("/admin");
  };

  return (
    <div>
      <div className="m-auto mt-10 w-96 rounded-xl bg-secondary-color">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 px-10 py-4">
            <h2 className="my-3 self-center text-2xl font-semibold">
              Admin login
            </h2>
            <Input
              name="email"
              label="Email"
              placeholder="e.g. johndoe@example.com"
              register={register}
              errorMessage={errors.email?.message}
            />
            <Input
              name="password"
              label="Password"
              type="password"
              placeholder=""
              register={register}
              errorMessage={errors.password?.message}
            />
            <button className="btn btn-primary mb-3 mt-6 text-white">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
