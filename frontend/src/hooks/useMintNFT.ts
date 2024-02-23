import { useCallback, useState } from "react";
import { NFT_CONTRACT } from "@/data/config";
import { BrowserProvider, Contract } from "ethers";
import { useSwitchNetwork } from "./useSwitchNetwork";
import { useMetaMask } from "./useMetaMask";

type UseMintNFTReturnType = {
  MintNFT: (to: `0x${string}`) => Promise<void>;
  isPending: boolean;
};

export const useMintNFT = (): UseMintNFTReturnType => {
  const { setErrorMessage } = useMetaMask();
  const { switchNetwork } = useSwitchNetwork();
  const [isPending, setIsPending] = useState<boolean>(false);

  const MintNFT = useCallback(
    async (to: `0x${string}`) => {
      if (!window.ethereum) {
        setErrorMessage("Ethereum object not found, please install MetaMask.");
        return;
      }

      setErrorMessage(null);
      setIsPending(true);

      try {
        const success = await switchNetwork();

        if (!success) {
          throw new Error("Failed to switch network.");
        }

        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(
          NFT_CONTRACT.address,
          NFT_CONTRACT.abi,
          signer
        );

        const transaction = await contract.safeMint(to);
        await transaction.wait();
      } catch (err) {
        let message: string | undefined;
        if ((err as any).code === "ACTION_REJECTED") {
          message = "MetaMask Tx Signature: User denied transaction signature.";
        }
        setErrorMessage(
          message ?? (err as Error).message ?? "Failed to mint NFT."
        );
      } finally {
        setIsPending(false);
      }
    },
    [switchNetwork, setErrorMessage]
  );

  return { MintNFT, isPending };
};
