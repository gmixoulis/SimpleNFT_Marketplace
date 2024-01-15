export default function refreshPage() {
  const reloadCount = localStorage.getItem("reloadCountNFT");
  if (reloadCount < 2) {
    localStorage.setItem("reloadCountNFT", String(Number(reloadCount) + 1));
    window.location.reload();
  }
}
