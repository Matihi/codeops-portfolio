import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const storedUsersKey = "addisEatsCustomers";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      hasHydrated: false,
      login: (data) => {
        const registeredUser = getUser(data, storedUsersKey);
        if (registeredUser === undefined) {
          return "Invalid credentials ";
        }
        set({ user: registeredUser });
        return "";
      },

      logout: () => {
        (set({ user: null }), useAuthStore.persist.clearStorage());
      },
    }),
    {
      name: "loggedInUser",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
      }),
      onRehydrateStorage: (state) => {
        state.hasHydrated = true;
      },
    },
  ),
);

function getUser(data, key) {
  let users = localStorage.getItem(key);
  if (!users) {
    users = `{"userData":[]}`;
  }
  const usersObject = JSON.parse(users);
  const registeredUser = usersObject.userData.find(
    (someUser) =>
      someUser.phone.slice(-9) === data.phone.slice(-9) &&
      someUser.password === data.password,
  );
  return registeredUser;
}

export default useAuthStore;
