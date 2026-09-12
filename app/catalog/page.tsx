import type { Metadata } from "next";
import CatalogPageClient from "./page.client";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Browse our catalog of campers and find your perfect match.",
};

export default function CatalogPage() {
  return (
    <div className="container">
      <CatalogPageClient />
    </div>
  );
}
