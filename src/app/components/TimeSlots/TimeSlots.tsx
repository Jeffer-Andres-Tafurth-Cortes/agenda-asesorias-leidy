"use client";

import styles from "./TimeSlots.module.css";
import { generateTimeSlots, ServiceType } from "./TimeSlots.utils";

interface Props {
  service: ServiceType;
  selected: string | null;
  onSelect: (time: string) => void;
  onBack?: () => void;
}

export default function TimeSlots({
  service,
  selected,
  onSelect,
  onBack,
}: Props) {
  const slots = generateTimeSlots(service);

  return (
    <div className={styles.wrapper}>
      {/* Back button */}
      {onBack && (
        <button className={styles.backButton} onClick={onBack}>
          ← Volver
        </button>
      )}

      <h4 className={styles.title}>Selecciona una hora</h4>

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
    </div>
  );
}
