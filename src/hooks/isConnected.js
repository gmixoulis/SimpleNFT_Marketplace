export default  async function isconnect() {
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  console.log(accounts.length);
  if (accounts.length) {
    return true;
  } else {
    return false;
  }
}