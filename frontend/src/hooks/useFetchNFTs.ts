import { useState, useEffect, useCallback } from "react";
import { useMetaMask } from "./useMetaMask";

type FetchNFTsResponse = {
  success: boolean;
  data: Nfts[];
  error: string | null;
};

export const useFetchNFTs = (account: `0x${string}`, chainId: number) => {
  const { setErrorMessage } = useMetaMask();
  const [nfts, setNfts] = useState<Nfts[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNFTs = useCallback(async () => {
    if (!account || !chainId) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/fetchNFTsFromWallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account, chainId }),
      });

      const data: FetchNFTsResponse = await response.json();

      if (data.success && data.data) {
        setNfts(data.data);
      } else {
        setErrorMessage(data.error || "Failed to fetch NFTs");
      }
    } catch (err) {
      setErrorMessage("An error occurred while fetching NFTs");
    } finally {
      setIsLoading(false);
    }
  }, [account, chainId, setErrorMessage]);

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  return { fetchNFTs, nfts, isLoading };
};
