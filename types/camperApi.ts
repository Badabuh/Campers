import type { Campers } from "./camper";
import type { form, transmission, engine, amenities } from "./types";

export interface CampersQueryParams {
  page?: number;
  perPage?: number;
  location?: string;
  form?: form;
  transmission?: transmission;
  engine?: engine;
  amenities?: amenities[];
}

export interface CampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Campers;
}

export interface ReviewResponse {
  id: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

export type ReviewsResponse = ReviewResponse[];

export interface BookingRequestRequest {
  name: string;
  email: string;
}
