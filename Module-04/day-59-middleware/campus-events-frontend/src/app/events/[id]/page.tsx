import { getEventById, getEventSessions } from "@/services/eventService";
import { capitalizeFirstLetter, when } from "@/services/format";
import Link from "next/link";
import { notFound } from "next/navigation";

const page = async ({
  params,
}: {
  params: Promise<{ id: string; sesId: string }>;
}) => {
  const { id } = await params;
  const event = await getEventById(id);
  if (event === null) {
    notFound();
  }

  const sessionData = await getEventSessions(id);
  const noSessions = sessionData.items.length === 0;
  const sessionElements = sessionData.items.map((item) => (
    <article
      key={item?.id}
      className="bg-sky-100 rounded-sm text-sm p-2 flex flex-col gap-2"
    >
      <p>{item?.title}</p>
      <Link
        href={`/events/${id}/${item?.id}`}
        className="self-center bg-sky-500 p-1 rounded text-[#ddded6] active:bg-sky-400"
      >
        View Details
      </Link>
    </article>
  ));
  return (
    <div className="w-full flex flex-col p-1">
      <div className="bg-sky-200 w-full sm:w-[50%] self-center flex flex-col items-center p-2 my-4 rounded-2xl gap-3">
        <h1 className="bg-sky-300 p-3 rounded-xl text-2xl">{event.title}</h1>
        <p className="text-center">{event.description}</p>
        <p>{event.location}</p>
        <p>{when.format(new Date(event.eventDate))}</p>
        <p>{capitalizeFirstLetter(event.category)}</p>
        <p>{event.isPublished ? "Published" : "Not published"}</p>
      </div>
      <div>
        <p className="text-center p-1">Sessions</p>
        {noSessions ? (
          <p className="text-center">No sessions for this event.</p>
        ) : (
          <div className="flex gap-2 justify-center">{sessionElements}</div>
        )}
      </div>
    </div>
  );
};

export default page;
