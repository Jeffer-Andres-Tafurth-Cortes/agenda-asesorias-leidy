import { ServiceType } from "../lib/services";

// src/types/booking.ts

export type BookingStep = "service" | "date" | "time" | "form" | "summary";

export interface Booking {
  service: ServiceType;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  name: string;
  email: string;
  phone: string;
  transactionId: string;
}
