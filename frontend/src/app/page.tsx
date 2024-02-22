"use client";
import styles from "../styles/page.module.css";
import { Display, MetaMaskError, Navigation } from "@/components";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navigation />
      <Display />
      <MetaMaskError />
    </main>
  );
}
