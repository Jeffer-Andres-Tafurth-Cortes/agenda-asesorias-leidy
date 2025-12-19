import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { SERVICES, ServiceType } from "../../lib/services";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const body: {
      service: ServiceType;
      date: string;
      time: string;
      name: string;
      email: string;
      phone: string;
    } = await req.json();

    const { service, date, time, name, email, phone } = body;

    if (!["virtual", "presencial"].includes(service)) {
      return NextResponse.json({ error: "Servicio inválido" }, { status: 400 });
    }

    if (!service || !date || !time || !email) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const serviceInfo = SERVICES[service];
    const reference = `BOOK-${randomUUID()}`;

    const booking = await prisma.booking.create({
      data: {
        reference,
        service,
        date: new Date(date),
        time,
        name,
        email,
        phone,
        amount: serviceInfo.price,
        status: "pending",
      },
    });

    return NextResponse.json({
      reference: booking.reference,
      amount: booking.amount,
      email: booking.email,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creando la reserva" },
      { status: 500 }
    );
  }
}
