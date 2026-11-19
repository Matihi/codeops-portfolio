import EventList from "@/components/EventList";
import Pagination from "@/components/Pagination";
import { getEvents } from "@/services/eventService";

interface EventsWrapperProps {
  url: string;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const EventsWrapper = async ({ url, searchParams }: EventsWrapperProps) => {
  const { page } = await searchParams;
  const pageNumber = Number(page) || 1;
  const pageQuery = `?page=${pageNumber}`;
  const allEvents = await getEvents(url + pageQuery);
  return (
    <div className="flex flex-col">
      <EventList events={allEvents.items} />
      <Pagination page={allEvents.page} totalPages={allEvents.totalPages} />
    </div>
  );
};

export default EventsWrapper;
