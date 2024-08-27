// import { useState } from 'react'
// import './App.css'
// import { generateMnemonic } from "bip39";
// import { SolanaWallet } from './SolanaWallet';
// import { EthWallet } from './EthWallet';
// import BitCoinWallet from './BitCoinWallet';
// function App() {
//   const [mnemonic, setMnemonic] = useState("");

//   return (
//     <>
//       <input type="text" value={mnemonic}></input>
//       <button onClick={async function() {
//         const mn = generateMnemonic();
//         setMnemonic(mn)
//       }}>
//         Create Seed Phrase
//       </button>

//       {mnemonic && <SolanaWallet mnemonic={mnemonic} />}
//       {mnemonic && <EthWallet mnemonic={mnemonic} />}
//       {mnemonic && <BitCoinWallet mnemonic={mnemonic} />}
//     </>
//   )
// }

// export default App
import React, { useState, useEffect } from 'react';
import { generateMnemonic } from 'bip39';
import { SolanaWallet } from './SolanaWallet';
import { EthWallet } from './EthWallet';
import BitCoinWallet from './BitCoinWallet';
import './App.css';

function App() {
  const [mnemonic, setMnemonic] = useState('');

  const createSeedPhrase = () => {
    const newMnemonic = generateMnemonic(128);
    setMnemonic(newMnemonic);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="app-container">
      <div className="background-images"></div>
      <h1>Crypto Wallet Generator</h1>
      <button className="create-seed-btn" onClick={createSeedPhrase}>Create Seed Phrase</button>
      
      {mnemonic && (
        <div className="seed-phrase-container">
          <h2>Your Seed Phrase</h2>
          <div className="seed-words">
            {mnemonic.split(' ').map((word, index) => (
              <span key={index} className="seed-word">{word}</span>
            ))}
          </div>
          <button className="copy-btn" onClick={() => copyToClipboard(mnemonic)}>Copy Seed Phrase</button>
        </div>
      )}

      <div className="wallets-container">
        <div className="wallet-section">
          <SolanaWallet mnemonic={mnemonic} />
        </div>
        <div className="wallet-section">
          <EthWallet mnemonic={mnemonic} />
        </div>
        <div className="wallet-section">
          <BitCoinWallet mnemonic={mnemonic} />
        </div>
      </div>
    </div>
  );
}

export default App;