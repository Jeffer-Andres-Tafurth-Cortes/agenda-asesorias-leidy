"use client";

import { useState } from "react";
import styles from "./BookingSummary.module.css";
import { BookingData } from "../Form/BookingForm";
import { SERVICES, ServiceType } from "../../lib/services";
import WompiButton from "../UI/WompiButton";

interface Props {
  service: ServiceType;
  date: Date;
  time: string;
  client: BookingData;
  onEdit?: () => void;
}

export default function BookingSummary({
  service,
  date,
  time,
  client,
  onEdit,
}: Props) {
  const serviceInfo = SERVICES[service];
  const [paymentData, setPaymentData] = useState<null | {
    reference: string;
    amount: number;
    email: string;
  }>(null);

  const createBooking = async () => {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service,
        date,
        time,
        name: client.name,
        email: client.email,
        phone: client.phone,
      }),
    });

    const data = await res.json();
    setPaymentData(data);
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Confirma tu asesoría</h2>

      <div className={styles.card}>
        <h3>{serviceInfo.label}</h3>

        <p>
          {date.toLocaleDateString("es-CO")} · {time}
        </p>

        <p>
          <strong>{client.name}</strong> · {client.email}
        </p>

        <div className={styles.priceBox}>
          ${serviceInfo.price.toLocaleString("es-CO")} COP
        </div>

        {onEdit && (
          <button className={styles.secondary} onClick={onEdit}>
            Modificar
          </button>
        )}

        {!paymentData ? (
          <button className={styles.primary} onClick={createBooking}>
            Confirmar y pagar
          </button>
        ) : (
          <WompiButton
            reference={paymentData.reference}
            amount={paymentData.amount}
            email={paymentData.email}
          />
        )}
      </div>
    </section>
  );
}
