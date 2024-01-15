export default function refreshPage() {
  const reloadCount = localStorage.getItem("reloadCount");
  if (reloadCount < 2) {
    localStorage.setItem("reloadCount", String(Number(reloadCount) + 1));
    window.location.reload();
  }
}
