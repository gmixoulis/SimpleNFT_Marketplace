export default async function CheckChain(){
    const chainId = await window.ethereum.request({ method: "eth_chainId" });

    if (chainId !== "0x1") {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
    }
}