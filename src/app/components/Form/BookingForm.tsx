"use client";

import { useState } from "react";
import styles from "./BookingForm.module.css";

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

interface Props {
  onSubmit: (data: BookingData) => void;
  onBack?: () => void;
}

export default function BookingForm({ onSubmit, onBack }: Props) {
  const [form, setForm] = useState<BookingData>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    onSubmit(form);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Back button */}
      {onBack && (
        <button type="button" className={styles.backButton} onClick={onBack}>
          ← Volver
        </button>
      )}

      <h4 className={styles.title}>Datos para la asesoría</h4>

      <label>
        Nombre completo *
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ej: María Gómez"
        />
      </label>

      <label>
        Correo electrónico *
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="correo@ejemplo.com"
        />
      </label>

      <label>
        Teléfono *
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="300 123 4567"
        />
      </label>

      <label>
        Comentarios (opcional)
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Cuéntame brevemente tu caso"
          rows={3}
        />
      </label>

      <button type="submit" className={styles.submit}>
        Continuar al pago
      </button>
    </form>
  );
}
