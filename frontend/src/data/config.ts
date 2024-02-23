import { ERC721_ABI } from "./abis/erc721_ABI";
import { linea, linea_testnet } from "./networks";

export const isDevEnv = process.env.NEXT_PUBLIC_DEV_ENV;

export const APP_URL = process.env.NEXT_PUBLIC_URL;

export const supportedChains = {
  mainnet: linea.id,
  testnet: linea_testnet.id,
};

export const nftContract = {
  address: "0x99482d34dD610067b66b0A32Fa3Cf1a512D77b2b", // Replace with your contract address
  abi: ERC721_ABI,
};

export const IPFS_PROVIDER = "https://cloudflare-ipfs.com/ipfs/";
