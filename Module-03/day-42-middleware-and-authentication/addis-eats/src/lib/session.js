import { cookies } from "next/headers";
import { sessionArray } from "./db";

const createSession = async (id) => {
  const expiresAt = new Date(Date.now() + 60 * 1000);
  const sessionId = crypto.randomUUID();

  const session = {
    sessionId,
    userId: id,
    expiresAt,
  };

  sessionArray.push(session);

  const cookieStore = await cookies();
  cookieStore.set("session", sessionId, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};

export default createSession;
