import { api } from "./api";
import type {
  BookingRequestRequest,
  CampersQueryParams,
  CampersResponse,
  ReviewsResponse,
} from "../../types/camperApi";
import type { CamperDetails } from "../../types/camper";

export const getCampers = async (
  params?: CampersQueryParams,
): Promise<CampersResponse> => {
  try {
    const response = await api.get("/campers", { params });
    return response.data;
  } catch (error) {
    console.error("Campers fetch failed:", error);
    throw error;
  }
};

export const getCamperById = async (id: string): Promise<CamperDetails> => {
  try {
    const response = await api.get(`/campers/${id}`);
    return response.data;
  } catch {
    throw new Error(`Camper not found`);
  }
};

export const getCamperReviews = async (
  id: string,
): Promise<ReviewsResponse> => {
  try {
    const response = await api.get(`/campers/${id}/reviews`);
    return response.data;
  } catch {
    throw new Error(`Camper not found`);
  }
};

export const postBookingRequest = async (
  id: string,
  data: BookingRequestRequest,
) => {
  try {
    const response = await api.post(`/campers/${id}/booking-requests`, data);
    return response.data;
  } catch {
    throw new Error(`Booking request failed`);
  }
};
