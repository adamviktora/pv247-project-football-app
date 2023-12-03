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
      className="m-auto block h-9 w-full rounded-lg border border-primary-color bg-secondary-color p-2 text-sm text-primary-color"
      onChange={onChange}
      value={selectedValue}
    >
      {children}
    </select>
  );
};

export default Select;
