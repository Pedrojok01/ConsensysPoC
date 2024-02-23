import { isDevEnv, SUPPORTED_CHAINS } from "@/data/config";
import { linea, linea_testnet } from "@/data/networks";
import { useState } from "react";
import { useMetaMask } from "./useMetaMask";

type UseEnsureNetworkReturnType = {
  switchNetwork: () => Promise<boolean>;
  isLoading: boolean;
};

const network = isDevEnv ? linea_testnet : linea;
const desiredChainId = isDevEnv
  ? SUPPORTED_CHAINS.testnet
  : SUPPORTED_CHAINS.mainnet;
const desiredChainToHex = `0x${desiredChainId.toString(16)}`;

export const useSwitchNetwork = (): UseEnsureNetworkReturnType => {
  const { wallet, setErrorMessage, clearError } = useMetaMask();
  const [isLoading, setIsLoading] = useState(false);

  const switchNetwork = async () => {
    if (!window.ethereum) {
      setErrorMessage("Ethereum object not found, please install MetaMask.");
      return false;
    }

    setIsLoading(true);
    clearError();

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: desiredChainToHex }],
      });

      clearError();
      return true;
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        // Chain not added to MetaMask, attempting to add it
        try {
          if (wallet.chainId === desiredChainToHex) {
            return true;
          }

          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: desiredChainToHex,
                chainName: network.name,
                nativeCurrency: network.nativeCurrency,
                rpcUrls: network.rpcUrls.default.http,
                blockExplorerUrls: [network.blockExplorers.default.url],
              },
            ],
          });

          clearError();
          return true;
        } catch (addError) {
          setErrorMessage("Failed to add the network to MetaMask.");
          return false;
        }
      } else {
        setErrorMessage("Failed to switch network.");
        return false;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { switchNetwork, isLoading };
};
