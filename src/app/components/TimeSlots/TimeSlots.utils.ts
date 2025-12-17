export type ServiceType = "virtual" | "presencial";

export const SCHEDULE = {
  virtual: {
    start: 8,
    end: 18,
    interval: 60,
  },
  presencial: {
    start: 9,
    end: 17,
    interval: 60,
  },
};

export function generateTimeSlots(service: ServiceType) {
  const config = SCHEDULE[service];
  const slots: string[] = [];

  for (let hour = config.start; hour < config.end; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
  }

  return slots;
}
