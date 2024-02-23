import { FC } from "react";

import { useMetaMask } from "@/hooks";
import styles from "./MetaMaskError.module.css";

export const MetaMaskError: FC = () => {
  const { error, errorMessage, clearError } = useMetaMask();

  return (
    <>
      {error && (
        <div
          className={styles.metaMaskError}
          style={error ? { backgroundColor: "brown" } : {}}
        >
          <div className={styles.textError} onClick={clearError}>
            <strong>Error:</strong> {errorMessage}
          </div>
        </div>
      )}
    </>
  );
};
