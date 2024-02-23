interface Window {
  ethereum: any;
}

type Nfts = {
  name: string;
  description: string;
  image: string;
  external_url: string;
  attributes: Attributes;
  uri: string;
  tokenId: string;
};

type Attributes = { display_type: string; trait_type: string; value: string };
