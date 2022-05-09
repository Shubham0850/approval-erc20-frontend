import * as Web3 from "web3";
import { OpenSeaPort, Network } from "opensea-js";

// This example provider won't let you make transactions, only read-only calls:
const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io");

export const seaport = new OpenSeaPort(provider, {
  networkName: Network.Main,
  apiKey: process.env.OPENSEA_API_KEY,
});
