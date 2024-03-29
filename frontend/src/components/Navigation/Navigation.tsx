import { FC } from "react";

import { useMetaMask } from "@/hooks";
import { formatAddress } from "@/utils/format";
import styles from "./Navigation.module.css";

export const Navigation: FC = () => {
  const {
    wallet,
    hasProvider,
    isConnecting,
    connectMetaMask,
    disconnectMetaMask,
  } = useMetaMask();

  return (
    <div className={styles.navigation}>
      <h2 className={styles.leftNav}>Infura + MetaMask + Linea PoC</h2>

      <div className={styles.rightNav}>
        {!hasProvider && (
          <a href="https://metamask.io" target="_blank" rel="noreferrer">
            Install MetaMask
          </a>
        )}
        {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
          <button disabled={isConnecting} onClick={connectMetaMask}>
            Connect MetaMask
          </button>
        )}
        {window.ethereum?.isMetaMask && wallet.accounts.length > 0 && (
          <button disabled={isConnecting} onClick={disconnectMetaMask}>
            Disconnect MetaMask
          </button>
        )}
        {hasProvider && wallet.accounts.length > 0 && (
          <a
            className="text_link tooltip-bottom"
            href={`https://etherscan.io/address/${wallet.accounts[0]}`}
            target="_blank"
            data-tooltip="Open in Block Explorer"
            rel="noreferrer"
          >
            {formatAddress(wallet.accounts[0])}
          </a>
        )}
      </div>
    </div>
  );
};
