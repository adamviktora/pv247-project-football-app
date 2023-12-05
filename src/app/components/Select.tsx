import { ChangeEvent, PropsWithChildren } from "react";

type SelectProps = {
  id?: string;
  selectedValue?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  isInline?: boolean;
};

const Select = ({
  id,
  selectedValue,
  onChange,
  children,
  isInline,
}: PropsWithChildren<SelectProps>) => {
  if (!selectedValue) {
    return <span>---</span>;
  }

  if (isInline) {
    return (
      <select
        id={id}
        className="select m-auto block bg-secondary-color font-semibold hover:bg-secondary-color-hover focus:border-none focus:outline-none"
        onChange={onChange}
        value={selectedValue}
      >
        {children}
      </select>
    );
  }

  return (
    <select
      id={id}
      className="select m-auto block w-full bg-secondary-color font-semibold focus:border-none"
      onChange={onChange}
      value={selectedValue}
    >
      {children}
    </select>
  );
};

export default Select;
