import React, { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export function SolanaWallet({ mnemonic }) {
  const [publicKeys, setPublicKeys] = useState([]);

  const generateAddress = async () => {
    if (!mnemonic) {
      alert("Mnemonic phrase is required.");
      return;
    }

    try {
      const seed = await mnemonicToSeed(mnemonic);
      const derivedSeed = derivePath(`m/44'/501'/${publicKeys.length}'/0'`, seed.toString('hex')).key;
      const keypair = Keypair.fromSeed(nacl.sign.keyPair.fromSeed(derivedSeed).secretKey);
      setPublicKeys([...publicKeys, keypair.publicKey]);
    } catch (error) {
      console.error("Error generating Solana address:", error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div>
      <h2>Solana Wallet</h2>
      <button onClick={generateAddress}>Generate Solana Address</button>
      {publicKeys.map((pubKey, index) => (
        <div key={index} className="wallet-address">
          {pubKey.toBase58()}
          <button className="copy-btn" onClick={() => copyToClipboard(pubKey.toBase58())}>Copy</button>
        </div>
      ))}
    </div>
  );
}