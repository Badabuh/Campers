import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.overlay} role="status" aria-live="polite">
      <div className={styles.loading}>
        <div className={styles.spinner} aria-hidden="true" />
        <p className={styles.title}>Loading tracks...</p>
        <p className={styles.message}>
          Please wait while we fetch the best
          <br />
          travel trucks for you
        </p>
      </div>
    </div>
  );
}
