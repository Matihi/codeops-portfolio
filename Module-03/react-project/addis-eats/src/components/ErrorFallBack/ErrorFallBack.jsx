import styles from "./ErrorFallBack.module.css";
const ErrorFallBack = ({ error, resetErrorBoundary }) => {
  return (
    <div className={styles.errorFallBack} role="alert">
      <p>Something went wrong</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
};

export default ErrorFallBack;
