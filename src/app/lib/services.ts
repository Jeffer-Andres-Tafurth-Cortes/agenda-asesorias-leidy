export type ServiceType = "virtual" | "presencial";

export const SERVICES: Record<
  ServiceType,
  {
    label: string;
    duration: string;
    price: number;
  }
> = {
  virtual: {
    label: "Asesoría Virtual",
    duration: "45 minutos",
    price: 120000,
  },
  presencial: {
    label: "Asesoría Presencial",
    duration: "60 minutos",
    price: 150000,
  },
};
