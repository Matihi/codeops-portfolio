import { users } from "./db";

export const checkDuplicate = (phone) => {
  const duplicate = users.find((user) => user.phone === phone);
  return !!duplicate;
};
