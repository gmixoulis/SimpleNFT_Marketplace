import ClaimContract from "../abis/marketplace.json";
import TokenContract from "../abis/course_mainet.json";
import { ethers } from "ethers";

const RPC = "https://mainnet.infura.io/v3/38194ef7ad9f4a149630daf5ab9e7747";

export const getAllNFTs = async () => {
  try {
    let Claimable = [];
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    //Pull the deployed contract instance
    if (chainId !== "0x1") {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
      
    }

    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    //Pull the deployed contract instance

    const contract = new ethers.Contract(
      ClaimContract.address,
      ClaimContract.abi,
      signer
    );

    let count = 1;
    let tr;
    const uris = [];
    while (Number((tr = await contract.uri(count))) !== count) {
      uris.push(tr);

      Claimable.push("Not Minted");
      try {
        if (Number(JSON.parse(await contract.balanceOf(addr, count))) > 0) {
          Claimable[count] = "Minted";
        }
      } catch (error) {
        console.log(error);
      }
      count = count + 1;
    }
    //Fetch all the details of every NFT from the contract and display
    var items = await Promise.all(
      uris.map(async (NFT, index) => {
        const metadata = await fetch(NFT).then((response) => response.json()); //.then((data) => {
        if (metadata.name !== "Placeholder Token") {
          const attrs = metadata.attributes.reduce((prev, curr) => ({
            ...prev,
            [curr.trait_type]: curr.value,
          }));
          return {
            image: metadata.image_url,
            name: metadata.name,
            course: attrs["Course Code"],
            cname: attrs["Course Name"],
            semester: attrs["Semester"],
            year: attrs["Year"],
            description: metadata.description,
            uri: index + 1,
            claimable: Claimable[index + 1],
          };
        }
      })
    );
    items = items.filter(function (element) {
      return element !== undefined;
    });
    return items;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const GetTokens = async () => {
  const ethers = require("ethers");

  let provider;
  let signer;

  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    const address = await signer.getAddress();
    const chainId = await window.ethereum.request({ method: "eth_chainId" });

    if (chainId !== "0x1") {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
    }
  } catch (e) {
    provider = new ethers.providers.JsonRpcProvider(RPC);
    signer = provider;
  }

  //Pull the deployed contract instance

  const contract = new ethers.Contract(
    TokenContract.address,
    TokenContract.abi,
    signer
  );

  let NFTlist = [];
  let tr;

  tr = await contract.tokenURI(1);
  let meta = await fetch(tr).then((response) => response.json());
  NFTlist.push(meta);
  const items = await Promise.all(
    NFTlist.map(async (i) => {
      if (i !== null) {
        const attrs = i.attributes.reduce(
          (prev, curr) => ({ ...prev, [curr.trait_type]: curr.value }),
          {}
        );
        return {
          image: i.image_url,
          course: attrs["Course Code"],
          description: i.description,
          cname: attrs["Course Name"],
          semester: attrs["Semester"],
          year: attrs["Year"],
        };
      }
    })
  );

  return items;
};
