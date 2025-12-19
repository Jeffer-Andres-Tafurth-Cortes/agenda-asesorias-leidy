import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const WOMPI_EVENTS_SECRET = process.env.WOMPI_EVENTS_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const signature = req.headers.get("x-signature");
  const timestamp = req.headers.get("x-timestamp");

  if (!signature || !timestamp) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // 🔐 Validar firma
  const payload = `${timestamp}.${JSON.stringify(body)}`;
  const expectedSignature = crypto
    .createHmac("sha256", WOMPI_EVENTS_SECRET)
    .update(payload)
    .digest("hex");

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // 📦 Datos del evento
  const event = body.event;
  const transaction = body.data?.transaction;

  if (event === "transaction.updated") {
    const status = transaction.status;
    const reference = transaction.reference;
    const email = transaction.customer_email;
    const amount = transaction.amount_in_cents / 100;

    if (status === "APPROVED") {
      console.log("✅ PAGO APROBADO", {
        reference,
        email,
        amount,
      });

      // 👉 AQUÍ VA TU LÓGICA REAL
      // - guardar reserva
      // - bloquear fecha/hora
      // - enviar correo
    } else {
      console.log("⚠️ Pago no aprobado:", status);
    }
  }

  return NextResponse.json({ received: true });
}
