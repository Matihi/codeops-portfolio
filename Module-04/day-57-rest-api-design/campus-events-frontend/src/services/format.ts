export const when = new Intl.DateTimeFormat("en-ET", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa",
});

export const timeOnly = new Intl.DateTimeFormat("en-ET", {
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa",
});

export const capitalizeFirstLetter = (val: string): string => {
  return val.charAt(0).toUpperCase() + val.slice(1);
};
