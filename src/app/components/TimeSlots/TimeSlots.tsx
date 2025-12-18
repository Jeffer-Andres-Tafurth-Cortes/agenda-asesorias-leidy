"use client";

import styles from "./TimeSlots.module.css";
import { ServiceType } from "../../lib/services";
import { getAvailableTimes } from "../../lib/availability";

interface Props {
  service: ServiceType;
  date: Date; // ⬅️ NUEVO
  selected: string | null;
  onSelect: (time: string) => void;
  onBack?: () => void;
}

export default function TimeSlots({
  service,
  date,
  selected,
  onSelect,
  onBack,
}: Props) {
  const slots = getAvailableTimes(date, service);

  return (
    <div className={styles.wrapper}>
      {onBack && (
        <button className={styles.backButton} onClick={onBack}>
          ← Volver
        </button>
      )}

      <h4 className={styles.title}>Selecciona una hora</h4>

      {slots.length === 0 ? (
        <p className={styles.empty}>
          No hay horarios disponibles para esta fecha
        </p>
      ) : (
        <div className={styles.grid}>
          {slots.map((time) => (
            <button
              key={time}
              className={`${styles.slot} ${
                selected === time ? styles.selected : ""
              }`}
              onClick={() => onSelect(time)}
            >
              {time}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
