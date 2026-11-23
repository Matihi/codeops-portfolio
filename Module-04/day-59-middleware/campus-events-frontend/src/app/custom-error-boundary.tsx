"use client";
import { catchError, type ErrorInfo } from "next/error";

const ErrorFallback = (
  props: { title: string },
  { error, retry }: ErrorInfo,
) => {
  const message = "Something went wrong!";
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{message}</p>
      <button
        className="bg-gray-400 text-white p-1 rounded-sm hover:bg-gray-500 "
        onClick={() => retry()}
      >
        Try again
      </button>
    </div>
  );
};

export default catchError(ErrorFallback);
