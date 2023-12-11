export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const calculateAge = (birthday: Date) => {
  const today = new Date();
  const timeDifference = today.getTime() - birthday.getTime();
  const yearsDifference = timeDifference / (365.25 * 24 * 60 * 60 * 1000);
  return Math.floor(yearsDifference);
};

export const getAgeLimit = (minAge: number) => {
  const todaysDate = new Date();
  const maxBirthday = new Date(todaysDate);
  maxBirthday.setFullYear(todaysDate.getFullYear() - 15);
  return maxBirthday;
};
