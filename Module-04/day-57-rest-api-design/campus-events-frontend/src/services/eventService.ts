import type { Event, Session, Page } from "@/types/event";

export class CustomFetchError extends Error {
  constructor(readonly message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class CreateEventError extends Error {
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

export const getEventById = async (id: string): Promise<Event> => {
  const res = await fetch(`${API_URL}/events/${id}`, {
    cache: "no-store",
    headers: {
      "x-api-key": `${process.env.API_TOKEN}`,
    },
  });
  if (!res.ok) {
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
): Promise<Session> => {
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
    throw new CustomFetchError("Failed to fetch session");
  }
  return res.json();
};

export const createEvent = async (event: Omit<Event, "id">): Promise<Event> => {
  const res = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${process.env.API_ADMIN_TOKEN}`,
    },
    body: JSON.stringify(event),
  });
  if (!res.ok) {
    console.log(res.body);
    throw new CreateEventError("Failed to create event");
  }
  return res.json();
};
