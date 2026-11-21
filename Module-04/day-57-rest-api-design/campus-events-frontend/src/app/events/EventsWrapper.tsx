import EventFilters from "@/components/EventFilters";
import EventList from "@/components/EventList";
import Pagination from "@/components/Pagination";
import { getEvents } from "@/services/eventService";

const urlForFilters = `${process.env.NEXT_PUBLIC_API_BASE_URL!}/events?page=1&limit=50`;

interface EventsWrapperProps {
  url: string;
  searchParams: Promise<{
    page?: string;
    category?: string;
    location?: string;
    publication?: string;
    sortBy?: string;
  }>;
}

const EventsWrapper = async ({ url, searchParams }: EventsWrapperProps) => {
  const { page, category, location, publication, sortBy } = await searchParams;
  const params = new URLSearchParams();
  if (page) {
    params.set("page", `${Number(page) || 1}`);
  } else {
    params.delete("page");
  }

  if (category) {
    if (category.toLowerCase() === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
  } else {
    params.delete("category");
  }

  if (location) {
    if (location.toLowerCase() === "all") {
      params.delete("location");
    } else {
      params.set("location", location);
    }
  } else {
    params.delete("location");
  }

  if (publication) {
    if (publication.toLowerCase() === "all") {
      params.delete("isPublished");
    } else if (publication.toLowerCase() === "published") {
      params.set("isPublished", "true");
    } else if (publication.toLowerCase() === "not published") {
      params.set("isPublished", "false");
    }
  } else {
    params.delete("isPublished");
  }

  if (sortBy) {
    params.set("sortBy", sortBy);
  } else {
    params.delete("sortBy");
  }

  const allEvents = await getEvents(`${url}?${params.toString()}`);
  const forFilters = await getEvents(urlForFilters);
  const categories = [
    ...new Set(forFilters.items.map((item) => item.category)),
  ];
  const locations = [...new Set(forFilters.items.map((item) => item.location))];
  const publicationStatuses = [true, false];

  return (
    <div className="flex flex-col">
      <EventFilters
        categories={categories}
        locations={locations}
        publicationStatuses={publicationStatuses}
      />
      <EventList events={allEvents.items} />
      <Pagination page={allEvents.page} totalPages={allEvents.totalPages} />
    </div>
  );
};

export default EventsWrapper;
