import { PropsWithChildren } from "react";

type LabelProps = {
  htmlFor: string;
};

const Label = ({ htmlFor, children }: PropsWithChildren<LabelProps>) => (
  <label
    htmlFor={htmlFor}
    className="mb-2 block text-sm font-medium text-primary-color"
  >
    {children}
  </label>
);

export default Label;
