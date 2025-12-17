import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.card}>
        <span className={styles.badge}>Asesoría Legal</span>

        <h1 className={styles.title}>Bienvenido</h1>

        <p className={styles.subtitle}>
          Agenda tu asesoría y da el primer paso hacia una solución clara, justa
          y acompañada.
        </p>

        <Link href="/agenda">
          <button className={styles.cta}>Agendar asesoría</button>
        </Link>
      </div>
    </main>
  );
}
