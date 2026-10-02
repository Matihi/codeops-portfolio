"use client";
import { useRouter } from "next/navigation";

const BackToHome = () => {
  const router = useRouter();

  return (
    <div>
      <button
        className="bg-red-300 p-1 rounded cursor-pointer"
        onClick={() => router.push("/")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default BackToHome;
