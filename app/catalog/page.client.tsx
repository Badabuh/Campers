"use client";

import FormSearch from "@/components/FormSearch/FormSearch";
import styles from "./page.module.css";
import { useState } from "react";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { getCampers } from "@/lib/api/clientApi";
import type { CampersQueryParams, CampersResponse } from "@/types/camperApi";
import Image from "next/image";
import NotFound from "@/components/NotFound/NotFound";
import Link from "next/link";

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <use href={`/svg/brand-sprite.svg#${name}`} />
    </svg>
  );
}

export default function CatalogPageClient() {
  const [formData, setFormData] = useState<CampersQueryParams>({});
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<
    CampersResponse,
    Error,
    InfiniteData<CampersResponse>,
    [string, CampersQueryParams],
    number
  >({
    queryKey: ["campers", formData],
    queryFn: ({ pageParam }) =>
      getCampers({
        ...formData,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
  });

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];
  const total = data?.pages[0].total;

  return (
    <div className={styles.catalogPage}>
      <FormSearch setData={setFormData} />
      <section aria-live="polite" className={styles.section}>
        {isLoading && <p>Loading campers...</p>}
        {isError && <p>Unable to load campers.</p>}
        {total === 0 && <NotFound />}
        {campers.length > 0 && (
          <ul className={styles.listCards}>
            {campers.map((camper) => (
              <li className={styles.camperCard} key={camper.id}>
                <Image
                  className={styles.camperImage}
                  src={camper.coverImage}
                  alt={camper.name}
                  width={219}
                  height={240}
                  loading="eager"
                />
                <div className={styles.camperContent}>
                  <div className={styles.cardHeader}>
                    <h2 className={styles.camperName}>{camper.name}</h2>
                    <p className={styles.camperPrice}>
                      €{camper.price.toLocaleString("uk-UA")}
                    </p>
                  </div>
                  <div className={styles.cardMeta}>
                    <span>
                      <Icon name="card-rating" className={styles.ratingIcon} />
                      {camper.rating.toFixed(1)} ({camper.totalReviews} Reviews)
                    </span>
                    <span>
                      <Icon name="map-pin" className={styles.mapPin} />{" "}
                      {camper.location}
                    </span>
                  </div>
                  <p className={styles.camperDescription}>
                    {camper.description}
                  </p>
                  <div className={styles.cardTags}>
                    <span className={styles.tag}>
                      <Icon name="card-engine" className={styles.tagIcon} />
                      {camper.engine}
                    </span>
                    <span className={styles.tag}>
                      <Icon
                        name="card-transmission"
                        className={styles.tagIcon}
                      />
                      {camper.transmission}
                    </span>
                    <span className={styles.tag}>
                      <Icon name="card-form" className={styles.tagIcon} />
                      {camper.form.replaceAll("_", " ")}
                    </span>
                  </div>
                  <Link
                    href={`/catalog/${camper.id}`}
                    className={styles.showMoreButton}
                  >
                    Show more
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
        {hasNextPage && (
          <button
            type="button"
            className={styles.buttonLoadMore}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}
      </section>
    </div>
  );
}
