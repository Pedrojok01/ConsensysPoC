import { useMetaMask } from "@/hooks/useMetaMask";
import styles from "./Display.module.css";
import { formatChainAsNum } from "@/utils/format";
import { useMintNFT } from "@/hooks/useMintNFT";
import NFTs from "../NFTs/NFTs";
import { useFetchNFTs } from "@/hooks/useFetchNFTs";

export const Display = () => {
  const { wallet } = useMetaMask();
  const { MintNFT } = useMintNFT();
  const { fetchNFTs, nfts, isLoading } = useFetchNFTs(
    wallet.accounts[0],
    Number(wallet.chainId)
  );

  return (
    <>
      {wallet.accounts.length > 0 && (
        <div className={styles.flexbox}>
          <div className={styles.display}>
            <h3>Wallet Infos</h3>
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
          </div>
          <div className={styles.display}>
            <h3>NFTs</h3>
            <div className={styles.nftGrid}>
              <button onClick={() => MintNFT(wallet.accounts[0])}>
                Mint NFTs
              </button>
              <button onClick={fetchNFTs}>Fetch NFTs</button>
            </div>
            <NFTs nfts={nfts} isLoading={isLoading} />
          </div>
        </div>
      )}
    </>
  );
};
