import { form, transmission, engine, amenities } from "./types";

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description: string;
  form: form;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: transmission;
  engine: engine;
  amenities: amenities[];
  coverImage: string;
  createdAt: string;
  updatedAt: string;
}

export interface CamperGalleryItem {
  id: string;
  thumb: string;
  original: string;
  order: number;
}

export interface CamperDetails extends Omit<Camper, "coverImage"> {
  gallery: CamperGalleryItem[];
}

export type Campers = Camper[];
