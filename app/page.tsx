"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import heroImage from "../images/hero.jpg";

export default function Home() {
  const router = useRouter();

  return (
    <div className={`${styles.page} container`}>
      <main className={styles.main}>
        <Image
          src={heroImage}
          alt="Camper van in nature"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.mainInner}>
          <div className={styles.mainText}>
            <h1 className="text-h1" style={{ color: "var(--color-inputs)" }}>
              Campers of your dreams
            </h1>
            <h2 className="text-h2" style={{ color: "var(--color-inputs)" }}>
              You can find everything you want in our catalog
            </h2>
          </div>
          <button
            className={`text-button ${styles.button}`}
            onClick={() => router.push("/catalog")}
          >
            View Now
          </button>
        </div>
      </main>
    </div>
  );
}
