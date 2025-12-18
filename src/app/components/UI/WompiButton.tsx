"use client";

interface Props {
  reference: string;
  amount: number;
  email: string;
}

export default function WompiButton({ reference, amount, email }: Props) {
  const handlePay = () => {
    const script = document.createElement("script");

    script.src = "https://checkout.wompi.co/widget.js";
    script.setAttribute("data-render", "button");
    script.setAttribute(
      "data-public-key",
      process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY!
    );
    script.setAttribute("data-currency", "COP");
    script.setAttribute("data-amount-in-cents", (amount * 100).toString());
    script.setAttribute("data-reference", reference);
    script.setAttribute("data-customer-data:email", email);
    script.setAttribute(
      "data-redirect-url",
      `${process.env.NEXT_PUBLIC_APP_URL}/pago/confirmacion`
    );

    document.body.appendChild(script);
  };

  return <button onClick={handlePay}>Pagar ahora</button>;
}
