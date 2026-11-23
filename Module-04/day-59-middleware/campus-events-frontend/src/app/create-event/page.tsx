"use client";
import { createEvent } from "@/services/eventService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Event } from "@/types/event";

const createEventSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title should be less than 100 characters long."),

  description: z
    .string()
    .min(1, "Description is required.")
    .max(500, "Description should be less 500 characters long."),

  location: z.string().min(1, "Location is required"),

  eventDate: z.iso.date(),

  category: z.string().min(1, "Category is required"),
  isPublished: z.boolean(),
});

const CreateEventPage = () => {
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(createEventSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      location: "",
      eventDate: new Date().toISOString().slice(0, 10),
      category: "",
      isPublished: false,
    },
  });

  const handleEventCreation = async (data: Omit<Event, "id">) => {
    setIsPending(true);
    try {
      const result = await createEvent(data);
      if (!!result.error) {
        setError("root.serverError", {
          type: "400",
          message: result.error,
        });
      } else {
        setSuccess(true);
        reset();
        setTimeout(() => setSuccess(false), 2000);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError("root.serverError", {
          type: "500",
          message: error.message,
        });
      }
    } finally {
      setIsPending(false);
    }
  };

  console.log("errors: ", errors);

  return (
    <section className="h-full flex flex-col gap-3">
      <h1 className="self-center text-xl">Fill the form to add an event</h1>
      {success && (
        <p className="p-2 bg-green-200 w-fit self-center rounded-md text-green-500">
          Event Created
        </p>
      )}
      <form
        method="post"
        onSubmit={handleSubmit(handleEventCreation)}
        className="self-center bg-sky-100 p-3 flex flex-col gap-3 w-[80%] rounded-2xl"
        aria-describedby={
          errors.root?.serverError?.type === "400"
            ? "form-error"
            : errors.root?.serverError?.type === "500"
              ? "server-error"
              : undefined
        }
      >
        {errors.root?.serverError?.type === "400" && (
          <p id="form-error" role="alert" className="text-red-600">
            {errors.root?.serverError?.message}
          </p>
        )}
        {errors.root?.serverError?.type === "500" && (
          <p id="server-error" role="alert" className="text-blue-600">
            {errors.root?.serverError?.message}
          </p>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className="border rounded-md sm:w-[50%] p-1 bg-white"
            aria-invalid={!!errors.title}
            aria-describedby={!!errors.title ? "title-error" : undefined}
          />
          {!!errors.title && (
            <p id="title-error" className="text-red-600">
              {errors.title?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            {...register("description")}
            className="border w-full rounded-md p-1 bg-white"
            aria-invalid={!!errors.description}
            aria-describedby={
              !!errors.description ? "description-error" : undefined
            }
          ></textarea>
          {!!errors.description && (
            <p id="description-error" className="text-red-600">
              {errors.description?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            {...register("location")}
            className="border rounded-md sm:w-[50%] p-1 bg-white"
            aria-invalid={!!errors.location}
            aria-describedby={!!errors.location ? "location-error" : undefined}
          />
          {!!errors.location && (
            <p id="location-error" className="text-red-600">
              {errors.location?.message}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <label htmlFor="event-date">Event Date:</label>
          <input
            type="date"
            id="event-date"
            {...register("eventDate")}
            className="border rounded-md p-1 bg-white"
            aria-invalid={!!errors.eventDate}
            aria-describedby={
              !!errors.eventDate ? "event-date-error" : undefined
            }
          />
          {!!errors.eventDate && (
            <p id="event-date-error" className="text-red-600">
              {errors.eventDate?.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            {...register("category")}
            className="border rounded-md p-1 sm:w-[50%] bg-white"
            aria-invalid={!!errors.category}
            aria-describedby={!!errors.category ? "category-error" : undefined}
          />
          {!!errors.category && (
            <p id="category-error" className="text-red-600">
              {errors.category?.message}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <label htmlFor="isPublished">{`Published?(Omit for No): Yes`}</label>
          <input
            type="checkbox"
            id="isPublished"
            {...register("isPublished")}
            aria-invalid={!!errors.isPublished}
            aria-describedby={
              !!errors.isPublished ? "isPublished-error" : undefined
            }
          />
          {!!errors.isPublished && (
            <p id="isPublished-error" className="text-red-600">
              {errors.isPublished?.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-sky-400 active:bg-sky-300 p-1 px-4 rounded-md text-[#e2e3e8] w-fit self-center disabled:bg-gray-300"
        >
          Add event
        </button>
      </form>
    </section>
  );
};

export default CreateEventPage;
