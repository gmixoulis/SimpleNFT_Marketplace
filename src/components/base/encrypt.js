const EthCrypto = require("eth-crypto");

async function encrypt({ signature, secretMessage }) {
  const payload = {
    message: secretMessage,
    signature,
  };
  const server =
    "";

  const encrypted = await EthCrypto.encryptWithPublicKey(
    server, // by encrypting with bobs publicKey, only bob can decrypt the payload with his privateKey
    JSON.stringify(payload) // we have to stringify the payload before we can encrypt it
  );
  /*  { iv: 'c66fbc24cc7ef520a7...',
  ephemPublicKey: '048e34ce5cca0b69d4e1f5...',
  ciphertext: '27b91fe986e3ab030...',
  mac: 'dd7b78c16e462c42876745c7...'
    }
*/

  // we convert the object into a smaller string-representation
  return EthCrypto.cipher.stringify(encrypted);
}

export default encrypt;
