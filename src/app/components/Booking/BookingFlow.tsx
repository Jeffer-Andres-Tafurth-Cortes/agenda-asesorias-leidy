"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./BookingFlow.module.css";

import ServiceSelector from "../ServiceSelector/ServiceSelector";
import Calendar from "../Calendar/Calendar";
import TimeSlots from "../TimeSlots/TimeSlots";
import BookingForm, { BookingData } from "../Form/BookingForm";
import BookingSummary from "../Summary/BookingSummary";

import { ServiceType } from "../../lib/services";
import { BookingStep } from "../../types/booking";

const transition = {
  duration: 0.35,
  ease: "easeInOut" as const, // 👈 tip TS
};

export default function BookingFlow() {
  const [step, setStep] = useState<BookingStep>("service");

  const [service, setService] = useState<ServiceType | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [client, setClient] = useState<BookingData | null>(null);

  return (
    <div className={styles.flowWrapper}>
      <div className={styles.flowContent}>
        <AnimatePresence mode="wait">
          {/* PASO 1 */}
          {step === "service" && (
            <motion.div
              key="service"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={transition}
            >
              <ServiceSelector
                value={service}
                onChange={(value) => {
                  setService(value);
                  setStep("date");
                }}
              />
            </motion.div>
          )}

          {/* PASO 2 */}
          {step === "date" && service && (
            <motion.div
              key="date"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={transition}
            >
              <Calendar
                value={date}
                onChange={(value) => {
                  setDate(value);
                  setStep("time");
                }}
                onBack={() => setStep("service")}
              />
            </motion.div>
          )}

          {/* PASO 3 */}
          {step === "time" && service && date && (
            <motion.div
              key="time"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={transition}
            >
              <TimeSlots
                service={service}
                selected={time}
                onSelect={(value) => {
                  setTime(value);
                  setStep("form");
                }}
                onBack={() => setStep("date")}
              />
            </motion.div>
          )}

          {/* PASO 4 */}
          {step === "form" && time && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={transition}
            >
              <BookingForm
                onSubmit={(data) => {
                  setClient(data);
                  setStep("summary");
                }}
                onBack={() => setStep("time")}
              />
            </motion.div>
          )}

          {/* PASO 5 */}
          {step === "summary" && service && date && time && client && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={transition}
            >
              <BookingSummary
                service={service}
                date={date}
                time={time}
                client={client}
                onEdit={() => setStep("service")}
                onConfirm={() => setStep("payment")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
