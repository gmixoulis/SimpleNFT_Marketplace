import MarketplaceJSON from "../abis/course_mainet.json";
import { readContract } from "@wagmi/core";
export const HasToken = async () => {
  const ethers = require("ethers");

  //After adding your Hardhat network to your metamask, this code will get providers and signers
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var signer = provider.getSigner();
    var addr = await signer.getAddress();
  } catch (e) {
    return false;
  }
  const replacer = (key, value) =>
    typeof value === "bigint" ? value.toString() : value;
  //Pull the deployed contract instance
  const data = await readContract({
    address: MarketplaceJSON.address,
    abi: MarketplaceJSON.abi,
    functionName: "balanceOf",
    args: [addr],
  });
  //while ((tr = await contract.tokenUri(count)) !== count) {
  let transaction = JSON.stringify(data, replacer);
  return transaction >= '"1"';
};
