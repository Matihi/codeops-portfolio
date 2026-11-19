import EventList from "@/components/EventList";
import { getUpcomingEvents } from "@/services/eventService";

const UpcomingWrapper = async () => {
  const upcomingEvents = await getUpcomingEvents();
  return <EventList events={upcomingEvents.items} />;
};

export default UpcomingWrapper;
