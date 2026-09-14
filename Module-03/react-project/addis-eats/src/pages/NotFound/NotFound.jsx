import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.notFoundStatus}>404</h1>
      <p className={styles.message}>Page not found</p>
    </div>
  );
};

export default NotFound;
