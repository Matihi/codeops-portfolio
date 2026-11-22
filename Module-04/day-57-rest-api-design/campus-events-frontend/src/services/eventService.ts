"use server";
import type { Event, Session, Page } from "@/types/event";

class CustomFetchError extends Error {
  constructor(readonly message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

class CreateEventError extends Error {
  constructor(readonly message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export const getEvents = async (url: string): Promise<Page<Event>> => {
  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "x-api-key": `${process.env.API_TOKEN}`,
    },
  });
  if (!res.ok) {
    throw new CustomFetchError("Failed to fetch events");
  }
  return res.json();
};

export const getUpcomingEvents = async (): Promise<Page<Event>> => {
  const res = await fetch(`${API_URL}/events/upcoming`, {
    cache: "no-store",
    headers: {
      "x-api-key": `${process.env.API_TOKEN}`,
    },
  });
  if (!res.ok) {
    throw new CustomFetchError("Failed to fetch upcoming events");
  }
  return res.json();
};

export const getEventById = async (id: string): Promise<Event | null> => {
  const res = await fetch(`${API_URL}/events/${id}`, {
    cache: "no-store",
    headers: {
      "x-api-key": `${process.env.API_TOKEN}`,
    },
  });
  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new CustomFetchError("Failed to fetch event");
  }
  return res.json();
};

export const getEventSessions = async (id: string): Promise<Page<Session>> => {
  const res = await fetch(`${API_URL}/events/${id}/sessions`, {
    cache: "no-store",
    headers: {
      "x-api-key": `${process.env.API_TOKEN}`,
    },
  });
  if (!res.ok) {
    throw new CustomFetchError("Failed to fetch sessions");
  }
  return res.json();
};

export const getSessionForEvent = async (
  eventId: string,
  sessionId: string,
): Promise<Session | null> => {
  const res = await fetch(
    `${API_URL}/events/${eventId}/sessions/${sessionId}`,
    {
      cache: "no-store",
      headers: {
        "x-api-key": `${process.env.API_TOKEN}`,
      },
    },
  );
  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new CustomFetchError("Failed to fetch session");
  }
  return res.json();
};

export const createEvent = async (
  event: Omit<Event, "id">,
): Promise<{ event: Event | undefined; error: string | undefined }> => {
  console.log("api_key: ", process.env.API_ADMIN_TOKEN);
  const res = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${process.env.API_ADMIN_TOKEN}`,
    },
    body: JSON.stringify(event),
  });
  if (!res.ok) {
    console.log(res.headers);
    console.log(res.body);
    if (res.status === 400) {
      return { event: undefined, error: "Validation error" };
    }
    throw new CreateEventError("Failed to create event");
  }
  return { event: await res.json(), error: undefined };
};
