import { useMetaMask } from "@/hooks/useMetaMask";
import styles from "./Display.module.css";
import { formatChainAsNum } from "@/utils/format";

export const Display = () => {
  const { wallet } = useMetaMask();

  return (
    <div className={styles.display}>
      {wallet.accounts.length > 0 && (
        <>
          <div>
            Wallet Accounts: <b>{wallet.accounts[0]}</b>
          </div>
          <div>
            Wallet Balance: <b>{wallet.balance}</b>
          </div>
          <div>
            Hex ChainId: <b>{wallet.chainId}</b>
          </div>
          <div>
            Numeric ChainId: <b>{formatChainAsNum(wallet.chainId)}</b>
          </div>
        </>
      )}
    </div>
  );
};
