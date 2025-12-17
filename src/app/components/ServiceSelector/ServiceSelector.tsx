"use client";

import styles from "./ServiceSelector.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faBuilding } from "@fortawesome/free-solid-svg-icons";

export type ServiceType = "virtual" | "presencial";

interface Props {
  value: ServiceType | null;
  onChange: (value: ServiceType) => void;
}

export default function ServiceSelector({ value, onChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Selecciona el tipo de asesoría</h2>

      <div className={styles.options}>
        <button
          type="button"
          className={`${styles.option} ${
            value === "virtual" ? styles.active : ""
          }`}
          onClick={() => onChange("virtual")}
        >
          <FontAwesomeIcon icon={faLaptop} className={styles.icon} />
          <span>Virtual</span>
        </button>

        <button
          type="button"
          className={`${styles.option} ${
            value === "presencial" ? styles.active : ""
          }`}
          onClick={() => onChange("presencial")}
        >
          <FontAwesomeIcon icon={faBuilding} className={styles.icon} />
          <span>Presencial</span>
        </button>
      </div>
    </div>
  );
}
