import { TIME_SLOTS } from "./constants";
import { ServiceType } from "./services";

/** Días habilitados por servicio
 * 0 = Domingo, 1 = Lunes ... 6 = Sábado
 */
const SERVICE_DAYS: Record<ServiceType, number[]> = {
  virtual: [1, 2, 3, 4, 5], // Lun a Vie
  presencial: [2, 4], // Mar y Jue
};

/**
 * Fechas bloqueadas específicas (festivos, vacaciones, etc)
 */
const BLOCKED_DATES: string[] = ["2025-01-01", "2025-12-25"];

/**
 * Verifica si un día está disponible para un servicio
 */
export function isDateAvailable(date: Date, service: ServiceType): boolean {
  const day = date.getDay();
  const iso = date.toISOString().split("T")[0];

  if (BLOCKED_DATES.includes(iso)) return false;
  if (!SERVICE_DAYS[service].includes(day)) return false;

  return true;
}

export function getAvailableTimes(date: Date, service: ServiceType): string[] {
  const day = date.getDay(); // 0 = domingo

  // ❌ Domingo no hay atención
  if (day === 0) return [];

  // Virtual: todos los slots
  if (service === "virtual") {
    return TIME_SLOTS;
  }

  // Presencial: solo mañana
  if (service === "presencial") {
    return TIME_SLOTS.filter((t) => {
      const hour = parseInt(t.split(":")[0]);
      return hour >= 8 && hour <= 12;
    });
  }

  return [];
}
