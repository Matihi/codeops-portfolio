import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

const RequireAuth = ({ children }) => {
  const user = useAuthStore((s) => s.user);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  const location = useLocation();
  if (!hasHydrated) {
    return <p>Loading...</p>;
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
