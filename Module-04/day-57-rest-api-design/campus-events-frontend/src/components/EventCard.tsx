import { capitalizeFirstLetter, when } from "@/services/format";
import { Event } from "@/types/event";

interface EventCardProp {
  event: Event;
}

const EventCard = ({ event }: EventCardProp) => {
  return (
    <article className="bg-sky-200 h-44 flex flex-col text-sm p-2 gap-1 rounded-md sm:text-[0.9rem] sm:h-48  [@media(min-width:64rem)]:h-52">
      <p>{event.title}</p>
      <p>{event.description}</p>
      <p>{`${when.format(new Date(event.eventDate))}`}</p>
      <p>{`Location: ${event.location}`}</p>
      <p>{capitalizeFirstLetter(event.category)}</p>
      {event.isPublished ? <p>Published</p> : <p>Not published yet</p>}
    </article>
  );
};

export default EventCard;
