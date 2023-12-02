const TeamSelect = () => {
  // TODO: Add functionality
  // TODO: Use at main page

  return (
    <select
      id="teamSelect"
      className="block w-32 h-9 m-auto p-2 text-sm text-primary-color border border-primary-color rounded-lg bg-secondary-color"
    >
      <option value="chelsea">Chelsea</option>
      <option value="arsenal">Arsenal</option>
      <option selected value="liverpool">
        Liverpool
      </option>
    </select>
  );
};

export default TeamSelect;
