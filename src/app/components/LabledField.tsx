const LabeledField = ({
  label,
  content,
}: {
  label: string;
  content: any;
}) => (
  <div className="flex flex-col">
    <div className="text-sm">{label}</div>
    <div className="text-xl font-semibold">{content}</div>
  </div>
);

export default LabeledField;
