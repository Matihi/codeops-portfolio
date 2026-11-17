import { when } from "../../../lib/format";
import styles from "./Event.module.css";

const Event = ({
  id,
  title,
  description,
  location,
  category,
  eventDate,
  isPublished,
}) => {
  return (
    <article className={styles.eventCard}>
      <p>{title}</p>
      <p>{description}</p>
      <p>{`${when.format(new Date(eventDate))}`}</p>
      <p>{location}</p>
      <p>{category}</p>
      {isPublished ? <p>Published</p> : <p>Not published yet</p>}
    </article>
  );
};

export default Event;
