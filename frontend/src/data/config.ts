import { ERC721_ABI } from "./abis/erc721_ABI";
import { linea, linea_testnet } from "./networks";

export const isDevEnv = process.env.NEXT_PUBLIC_DEV_ENV;

export const supportedChains = {
  mainnet: linea.id,
  testnet: linea_testnet.id,
};

export const nftContract = {
  address: "0x505E76dd375DEd411101eD80E23DEb93db4c323A", // Replace with your contract address
  abi: ERC721_ABI,
};
