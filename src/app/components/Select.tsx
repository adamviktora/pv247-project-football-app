import { ChangeEvent, PropsWithChildren } from "react";

type SelectProps = {
  id?: string;
  selectedValue?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({
  id,
  selectedValue,
  onChange,
  children,
}: PropsWithChildren<SelectProps>) => {
  if (!selectedValue) {
    return <span>---</span>;
  }

  return (
    <select
      id={id}
      className="block w-full h-9 m-auto p-2 text-sm text-primary-color border border-primary-color rounded-lg bg-secondary-color"
      onChange={onChange}
      value={selectedValue}
    >
      {children}
    </select>
  );
};

export default Select;
