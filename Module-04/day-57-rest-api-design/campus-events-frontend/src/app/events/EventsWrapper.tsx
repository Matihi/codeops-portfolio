import EventList from "@/components/EventList";
import { getEvents } from "@/services/eventService";

interface EventsWrapperProps {
  url: string;
}

const EventsWrapper = async ({ url }: EventsWrapperProps) => {
  const allEvents = await getEvents(url);
  return <EventList events={allEvents.items} />;
};

export default EventsWrapper;
