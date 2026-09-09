"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <Link href="/">
            <svg width="136" height="16" aria-hidden="true" focusable="false">
              <use href="/svg/brand-sprite.svg#travel-trucks-logo" />
            </svg>
          </Link>
          <ul>
            <li
              id="home"
              className={`text-body-2 ${pathname === "/" ? styles.active : ""}`}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              id="catalog"
              className={`text-body-2 ${pathname === "/catalog" ? styles.active : ""}`}
            >
              <Link href="/catalog">Catalog</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
