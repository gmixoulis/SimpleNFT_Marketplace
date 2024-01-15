export default function NotConnectedWallet() {
  const cachedProviderName = JSON.parse(
    localStorage.getItem("wagmi.connected")
  );
  if (cachedProviderName) return true;
  else {
    return false;
  }
}
