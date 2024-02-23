import { NextRequest, NextResponse } from "next/server";

import { nftContract, IPFS_PROVIDER } from "@/data/config";
import { JsonRpcProvider } from "ethers";
import { linea, linea_testnet } from "@/data/networks";
import { Contract } from "ethers";

type RequestBody = {
  account: `0x${string}`;
  chainId: number;
};

export const runtime = "nodejs";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const infuraApiKey = process.env.INFURA_API_KEY;

  if (!infuraApiKey) {
    return NextResponse.json(
      { success: false, message: "INFURA_API_KEY is not defined" },
      { status: 500 }
    );
  }

  const LINEA_RPC_URL = {
    mainnet: `https://linea-mainnet.infura.io/v3/${infuraApiKey}`,
    testnet: `https://linea-goerli.infura.io/v3/${infuraApiKey}`,
  };

  const { account, chainId } = (await request.json()) as RequestBody;

  if (!account || !chainId) {
    return NextResponse.json(
      { success: false, message: "Missing account or chainId" },
      { status: 400 }
    );
  }

  if (chainId !== linea.id && chainId !== linea_testnet.id) {
    return NextResponse.json(
      { success: false, message: "Invalid chainId" },
      { status: 400 }
    );
  }

  // const rpc_url =
  //   chainId === linea.id ? LINEA_RPC_URL.mainnet : LINEA_RPC_URL.testnet;
  const rpc_url = LINEA_RPC_URL.testnet;
  const provider = new JsonRpcProvider(rpc_url);
  const contract = new Contract(nftContract.address, nftContract.abi, provider);

  try {
    const balance: bigint = await contract.balanceOf(account);
    let nfts = [];

    if (Number(balance) === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        error: "No NFTs found for this account.",
      });
    }

    const uri = await contract.tokenURI(1);
    const formattedUri = uri.replace("ipfs://", IPFS_PROVIDER);

    const metadataResponse = await fetch(formattedUri);
    if (!metadataResponse.ok) throw new Error("Failed to fetch NFT metadata.");
    const metadata = await metadataResponse.json();

    // Initialize an array to hold promises for fetching each token's ID
    const tokenIdPromises = Array.from(
      { length: Number(balance) },
      (_, index) => contract.tokenOfOwnerByIndex(account, index)
    );

    // Resolve all promises to get all token IDs
    const tokenIds = await Promise.all(tokenIdPromises);
    const image = metadata.image.replace("ipfs://", IPFS_PROVIDER);

    nfts = tokenIds.map((tokenId) => ({
      ...metadata,
      image,
      uri: formattedUri,
      tokenId: tokenId.toString(),
    }));

    return NextResponse.json({
      success: true,
      data: nfts,
      error: "NFTs fetched successfully",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error(`Error while fetching NFTs: ${errorMessage}`);

    return NextResponse.json(
      {
        success: false,
        data: [],
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
