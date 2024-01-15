import { Button } from "flowbite-react";

export default function Dev() {
  async function switchNetwork() {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x5" }], // chainId must be in HEX with 0x in front
    });
  }
  return (
    <>
      {process.env.REACT_APP_ENV === "DEV" ? (
        <div>
          <Button
            size="xs"
            className="mt-2 bg-red-800 hover:bg-red-500 hover:text-white"
            onClick={() => switchNetwork()}
          >
            Switch Network
          </Button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
