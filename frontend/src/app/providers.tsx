"use client";
import { MetaMaskContextProvider } from "@/hooks/useMetaMask";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <MetaMaskContextProvider>{mounted && children}</MetaMaskContextProvider>
  );
}
