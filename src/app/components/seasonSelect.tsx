const SeasonSelect = () => {
  // TODO: Add functionality
  // TODO: Use at main page

  return (
    <select
      id="seasonSelect"
      className="block w-32 h-9 m-auto p-2 text-sm text-primary-color border border-primary-color rounded-lg bg-secondary-color"
    >
      <option value="2021">2021/2022</option>
      <option value="2022">2022/2023</option>
      <option selected value="2023">
        2023/2024
      </option>
    </select>
  );
};

export default SeasonSelect;
