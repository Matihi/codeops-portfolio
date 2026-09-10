import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userKey = "loggedInUser";
  const storedUsersKey = "addisEatsCustomers";

  useEffect(() => {
    const loggedUser = sessionStorage.getItem(userKey);
    if (loggedUser) {
      setUser(loggedUser);
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    let users = localStorage.getItem(storedUsersKey);
    if (!users) {
      users = `{"userData":[]}`;
    }
    const usersObject = JSON.parse(users);
    const registeredUser = usersObject.userData.find(
      (someUser) =>
        someUser.phone.slice(-9) === data.phone.slice(-9) &&
        someUser.password === data.password,
    );

    if (registeredUser === undefined) {
      return "Invalid credentials ";
    }
    setUser(registeredUser);
    sessionStorage.setItem(userKey, registeredUser);
    return "";
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(userKey);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
