import styles from "./NotFound.module.css";
import Image from "next/image";
import notFoundImage from "@/images/NoFound.png";

export default function NotFound() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={notFoundImage}
        alt="NotFound"
        width={488}
        height={463}
        loading="eager"
      />
      <div className={styles.content}>
        <h2 className={styles.header}>No campers found</h2>
        <p className={styles.text}>
          We couldn`t find any campers that match your filters.Try adjusting
          your search or clearing some filters.
        </p>
      </div>
      <div className={styles.buttons}>
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleReload}
        >
          <span className={styles.clearIcon}>X</span> Clear filters
        </button>
        <button
          type="button"
          className={styles.viewButton}
          onClick={handleReload}
        >
          View all campers
        </button>
      </div>
    </div>
  );
}
