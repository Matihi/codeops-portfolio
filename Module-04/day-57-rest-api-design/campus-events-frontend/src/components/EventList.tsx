import { Event } from "@/types/event";
import EventCard from "./EventCard";

interface EventListProps {
  events: Event[];
}

const EventList = async ({ events }: EventListProps) => {
  if (events.length === 0) {
    return (
      <p className="flex justify-center items-center p-3">
        No upcoming events found
      </p>
    );
  }
  const eventElements = events.map((event) => (
    <EventCard key={event.id} event={event} />
  ));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-2 my-3">
      {eventElements}
    </div>
  );
};

export default EventList;
