import { ReactNode } from "react";
import { UseFormRegister } from "react-hook-form";

type InputProps = {
  name: string;
  label: ReactNode;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<any>;
  errorMessage?: string;
  validationOptions?: Object;
};

const Input = ({
  name,
  label,
  placeholder,
  type,
  register,
  errorMessage,
  validationOptions,
}: InputProps) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        {...register(name, validationOptions)}
        type={type ?? "text"}
        placeholder={placeholder ?? "Type here"}
        className="input input-bordered w-full max-w-xs"
      />
      {errorMessage && (
        <div className="label">
          <span className="label-text-alt text-red-700">{errorMessage}</span>
        </div>
      )}
    </label>
  );
};

export default Input;
