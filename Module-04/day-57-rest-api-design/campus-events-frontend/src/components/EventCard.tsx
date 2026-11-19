import { capitalizeFirstLetter, when } from "@/services/format";
import { Event } from "@/types/event";

interface EventCardProp {
  event: Event;
}

const EventCard = ({ event }: EventCardProp) => {
  return (
    <article className="bg-sky-200 h-60 flex flex-col text-sm p-2 gap-1 rounded-md sm:text-[0.9rem]">
      <p className="p-1 text-[17px] rounded-sm bg-[#128a93] flex">
        {event.title}
      </p>
      <p className="w-full truncate">{event.description}</p>
      <p>{`${when.format(new Date(event.eventDate))}`}</p>
      <p>{`Location: ${event.location}`}</p>
      <p>{capitalizeFirstLetter(event.category)}</p>
      {event.isPublished ? <p>Published</p> : <p>Not published yet</p>}
    </article>
  );
};

export default EventCard;
