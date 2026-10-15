import { users } from "./db";

export const checkDuplicate = (phone) => {
  const duplicate = users.find((user) => user.phone === phone);
  return !!duplicate;
};

export const normalizePhone = (phone) => {
  if (phone.startsWith("0")) {
    return phone.replace("0", "+251");
  }
  return phone;
};
