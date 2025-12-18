"use client";

import { useState } from "react";
import styles from "./Calendar.module.css";
import {
  getMonthDays,
  getFirstDayOfMonth,
  formatMonth,
} from "./Calendar.utils";
import { isDateAvailable } from "../../lib/availability";
import { ServiceType } from "../../lib/services";

interface Props {
  value: Date | null;
  service: ServiceType;
  onChange: (date: Date) => void;
  onBack?: () => void;
}

export default function Calendar({ value, onChange, onBack, service }: Props) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const daysInMonth = getMonthDays(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const isSameDay = (d1: Date, d2: Date) =>
    d1.toDateString() === d2.toDateString();

  return (
    <div className={styles.calendar}>
      {/* Back button */}
      {onBack && (
        <button className={styles.backButton} onClick={onBack}>
          ← Volver
        </button>
      )}

      {/* Header */}
      <div className={styles.header}>
        <button onClick={prevMonth}>‹</button>
        <h3>{formatMonth(currentYear, currentMonth)}</h3>
        <button onClick={nextMonth}>›</button>
      </div>

      {/* Week days */}
      <div className={styles.weekdays}>
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      {/* Days */}
      <div className={styles.days}>
        {Array.from({ length: firstDay }).map((_, i) => (
          <span key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(currentYear, currentMonth, day);
          const isAvailable = isDateAvailable(date, service);
          const selected = value && isSameDay(value, date);

          return (
            <button
              key={day}
              disabled={!isAvailable}
              className={`${styles.day} ${selected ? styles.selected : ""} ${
                !isAvailable ? styles.disabled : ""
              }`}
              onClick={() => isAvailable && onChange(date)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
