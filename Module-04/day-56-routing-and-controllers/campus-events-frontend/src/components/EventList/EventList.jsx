import { ApiError } from "../../lib/fetcher";
import Event from "./Event/Event";
import styles from "./EventList.module.css";

const EventList = ({ items, error, isLoading }) => {
  if (isLoading) {
    return <p>Loading events...</p>;
  }
  if (error instanceof ApiError) {
    return <p>{error.data.error}</p>;
  } else if (error) {
    return <p>Failed to fetch dishes</p>;
  }
  if (!items || items.length === 0) {
    return <p>No events found.</p>;
  }
  const eventElements = items.map((event) => (
    <Event
      key={event.id}
      id={event.id}
      title={event.title}
      description={event.description}
      location={event.location}
      category={event.category}
      eventDate={event.eventDate}
      isPublished={event.isPublished}
    />
  ));

  return <div className={styles.eventGrid}>{eventElements}</div>;
};

export default EventList;
