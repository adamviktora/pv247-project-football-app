import { PropsWithChildren } from "react";

type LabelProps = {
  htmlFor: string;
};

const Label = ({ htmlFor, children }: PropsWithChildren<LabelProps>) => (
  <label
    htmlFor={htmlFor}
    className="block mb-2 text-sm font-medium text-primary-color"
  >
    {children}
  </label>
);

export default Label;
