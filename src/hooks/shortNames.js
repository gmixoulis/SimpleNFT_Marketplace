export default function encryptText(text) {
  if (typeof text !== "string") {
    return text;
  }

  if (/^0x[0-9a-fA-F]+$/.test(text)) {
    // Encrypt hexadecimal address
    const prefix = text.slice(0, text.length - 2);
    const suffix = text.slice(-3);
    return `${prefix}***${suffix}`;
  } else {
    // Encrypt name or other text
    const nameParts = text.trim().split(" ");
    const encryptedParts = nameParts.map((part) => {
      if (part.length <= 6) {
        const firstThreeChars = part.slice(0, 2);
        const lastFiveChars = part.slice(-2);
        const encryptedChars = "*".repeat(part.length - 4);

        return firstThreeChars + encryptedChars + lastFiveChars;
      }

      const firstThreeChars = part.slice(0, 4);
      const lastFiveChars = part.slice(-4);
      const encryptedChars = "*".repeat(part.length - 8);

      return firstThreeChars + encryptedChars + lastFiveChars;
    });

    return encryptedParts.join(" ");
  }
}
