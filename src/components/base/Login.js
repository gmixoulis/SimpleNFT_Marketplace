import {  useState } from "react";
import * as ethers from "ethers";
import crypto from "crypto-js";
import { BACKEND_URL } from "./constants";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function Login({ onLoggedIn, buton }) {
  // save JWT
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1
  const _getPublicAddress = async () => {
    if (!window.ethereum) {
      const err = "Please install MetaMask first!";
      window.alert(err);
      throw new Error(err);
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const publicAddress = await signer.getAddress();

    setLoading(true);

    return [signer, publicAddress];
  };

  // 2
  const _register = (publicAddress) =>
    fetch(BACKEND_URL + "/user/register", {
      body: JSON.stringify({ public_key: publicAddress }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
      referrerPolicy: "unsafe-url",
    }).then((r) => r.text()); // retrieve nonce

  // 3
  const _signMessage = async (signer, nonce) => {
    const msg = "I accept the Terms of Service: MetaU";
    if (!buton) {
      try {
        const hash = crypto
          .SHA256(BACKEND_URL + nonce + msg)
          .toString(crypto.enc.Hex);
        const signature = await signer.signMessage(hash);
        return [msg, signature];
      } catch (err) {
        console.log(err);
      
      }
    } else {
      const err = "You need to sign the message to continue!";
      window.alert(err);
      throw new Error(err);
    }
  };

  // 4
  const _signin = (publicAddress, nonce, msg, signature) =>
    fetch(BACKEND_URL + "/user/signin", {
      body: JSON.stringify({
        public_key: publicAddress,
        domain: BACKEND_URL,
        nonce,
        msg,
        signature,
      }),
      referrerPolicy: 'unsafe-url',
      headers: { "Content-Type": "application/json" },
      method: "POST",
    }).then((r) => r.text()); // retrieve JWT

  // steps + save JWT
  const onClick = async () => {
    try {
      const [signer, publicAddress] = await _getPublicAddress();
      const nonce = await _register(publicAddress);
      const [msg, signature] = await _signMessage(signer, nonce);
      const token = await _signin(publicAddress, nonce, msg, signature);
      onLoggedIn(token, publicAddress);
    } catch (err) {
      window.alert(err);
      navigate(-1);
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        id="buttonQuiz1"
        className="font-thin rounded text-center bg-[#707070] text-small font-p"
        disabled={buton}
        size="lg"
        onClick={onClick}
      >
        View Activity
      </Button>
    </div>
  );
}

export default Login;
