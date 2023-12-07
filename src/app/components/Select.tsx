import { ChangeEvent, PropsWithChildren, ReactNode } from "react";

type SelectProps = {
  selectedValue?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  label?: ReactNode;
  disabled?: boolean;
};

const Select = ({
  selectedValue,
  onChange,
  children,
  label,
  disabled,
}: PropsWithChildren<SelectProps>) => {
  if (label) {
    return (
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text text-black">{label}</span>
        </div>
        <select
          disabled={disabled}
          className={`select m-auto block w-full bg-secondary-color font-semibold text-black focus:border-none`}
          onChange={onChange}
          value={selectedValue}
        >
          {children}
        </select>
      </label>
    );
  }

  return (
    <select
      disabled={disabled}
      className={`select m-auto block bg-secondary-color font-semibold text-black hover:bg-secondary-color-hover focus:border-none focus:outline-none`}
      onChange={onChange}
      value={selectedValue}
    >
      {children}
    </select>
  );
};

export default Select;
