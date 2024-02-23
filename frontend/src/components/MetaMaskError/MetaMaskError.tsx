import { useMetaMask } from "@/hooks/useMetaMask";
import styles from "./MetaMaskError.module.css";

export const MetaMaskError = () => {
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
