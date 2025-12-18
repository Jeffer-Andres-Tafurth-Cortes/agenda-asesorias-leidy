"use client";

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

  // 🔐 Referencia única para Wompi
  const reference = `ASESORIA-${service}-${
    date.toISOString().split("T")[0]
  }-${time.replace(":", "")}`;

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Confirma tu asesoría</h2>

      <div className={styles.card}>
        {/* SERVICIO */}
        <div className={styles.block}>
          <h3>{serviceInfo.label}</h3>
          <p>
            ⏱ {serviceInfo.duration} · 📍{" "}
            {service === "virtual" ? "Modalidad online" : "Atención presencial"}
          </p>
        </div>

        {/* FECHA */}
        <div className={styles.row}>
          <span>Fecha</span>
          <strong>
            {date.toLocaleDateString("es-CO", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </strong>
        </div>

        <div className={styles.row}>
          <span>Hora</span>
          <strong>{time}</strong>
        </div>

        {/* CLIENTE */}
        <div className={styles.client}>
          <p>
            <strong>Nombre:</strong> {client.name}
          </p>
          <p>
            <strong>Email:</strong> {client.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {client.phone}
          </p>
        </div>

        {/* PRECIO */}
        <div className={styles.priceBox}>
          <span>Total a pagar</span>
          <strong>${serviceInfo.price.toLocaleString("es-CO")} COP</strong>
        </div>

        {/* MENSAJE */}
        <p className={styles.note}>
          Tu asesoría queda reservada únicamente al confirmar el pago. Toda la
          información es tratada de forma confidencial.
        </p>

        {/* ACCIONES */}
        <div className={styles.actions}>
          {onEdit && (
            <button className={styles.secondary} onClick={onEdit}>
              Modificar
            </button>
          )}

          {/* 💳 BOTÓN WOMPI */}
          <WompiButton
            reference={reference}
            amount={serviceInfo.price}
            email={client.email}
          />
        </div>
      </div>
    </section>
  );
}
