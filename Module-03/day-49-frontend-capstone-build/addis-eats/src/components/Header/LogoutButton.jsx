"use client";
import { logout } from "@/actions/logout-actions";

const LogoutButton = () => {
  return (
    <button
      className="bg-lime-600 px-1 rounded-sm hover:bg-lime-500"
      onClick={async () => await logout()}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
