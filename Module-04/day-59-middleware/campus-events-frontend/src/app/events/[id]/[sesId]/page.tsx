import { getSessionForEvent } from "@/services/eventService";
import { timeOnly } from "@/services/format";
import { notFound } from "next/navigation";

const SessionPage = async ({
  params,
}: {
  params: Promise<{ id: string; sesId: string }>;
}) => {
  const { id, sesId } = await params;
  const session = await getSessionForEvent(id, sesId);
  if (session === null) {
    notFound();
  }

  return (
    <div className="flex justify-center p-2">
      <div className="bg-sky-200 w-full sm:w-[50%] self-center flex flex-col items-center p-2 my-4 rounded-2xl gap-3">
        <h1 className="bg-sky-300 p-3 rounded-xl text-2xl">{session.title}</h1>
        <p>{`From ${timeOnly.format(new Date(session.startsAt))} to ${timeOnly.format(new Date(session.endsAt))}`}</p>
        <p>{`${session.room}`}</p>
      </div>
    </div>
  );
};

export default SessionPage;
