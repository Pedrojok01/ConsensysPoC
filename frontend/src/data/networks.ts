export const linea = {
  id: 59144,
  name: "Linea",
  nativeCurrency: {
    name: "Linea Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.linea.build"] },
    public: { http: ["https://rpc.linea.build"] },
  },
  blockExplorers: {
    default: { name: "Lineascan", url: "https://lineascan.build" },
  },
  testnet: false,
};

export const linea_testnet = {
  id: 59140,
  name: "Linea Goerli Testnet",
  nativeCurrency: {
    name: "Linea Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.goerli.linea.build"] },
    public: { http: ["https://rpc.goerli.linea.build"] },
  },
  blockExplorers: {
    default: { name: "Lineascan", url: "https://goerli.lineascan.build" },
  },
  testnet: true,
};
