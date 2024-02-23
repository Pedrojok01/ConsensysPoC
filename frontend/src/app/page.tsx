"use client";
import { Display, MetaMaskError, Navigation } from "@/components";
import styles from "../styles/page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navigation />
      <MetaMaskError />
      <Display />
    </main>
  );
}
