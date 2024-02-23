import React, { FC } from "react";

import styles from "./NFTs.module.css";

type NFTsProps = {
  nfts: Nfts[];
  isLoading: boolean;
};

const NFTs: FC<NFTsProps> = ({ nfts, isLoading }) => {
  if (isLoading) return <p>Loading NFTs...</p>;

  return (
    <div className={styles.nftGrid}>
      {!isLoading && nfts.length > 0 ? (
        nfts.map((nft) => (
          <div key={nft.tokenId} className={styles.nftItem}>
            <img src={nft.image} alt={nft.name} className={styles.nftImage} />
            <div className={styles.nftInfo}>
              <div className={styles.nftTitle}>{nft.name}</div>
              <div>
                <b>Desc:</b> {nft.description}
              </div>
              <div>
                <b>Token ID:</b> {nft.tokenId}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No NFTs found for the given account.</p>
      )}
    </div>
  );
};

export default NFTs;
