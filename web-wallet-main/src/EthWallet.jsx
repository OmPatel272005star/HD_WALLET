import React, { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

export function EthWallet({ mnemonic }) {
  const [addresses, setAddresses] = useState([]);

  const generateAddress = async () => {
    if (!mnemonic) {
      alert("Mnemonic phrase is required.");
      return;
    }

    try {
      const seed = await mnemonicToSeed(mnemonic);
      const hdNode = HDNodeWallet.fromSeed(seed);
      const wallet = hdNode.derivePath(`m/44'/60'/${addresses.length}'/0/0`);
      setAddresses([...addresses, wallet.address]);
    } catch (error) {
      console.error("Error generating Ethereum address:", error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div>
      <h2>Ethereum Wallet</h2>
      <button onClick={generateAddress}>Generate Ethereum Address</button>
      {addresses.map((address, index) => (
        <div key={index} className="wallet-address">
          {address}
          <button className="copy-btn" onClick={() => copyToClipboard(address)}>Copy</button>
        </div>
      ))}
    </div>
  );
}