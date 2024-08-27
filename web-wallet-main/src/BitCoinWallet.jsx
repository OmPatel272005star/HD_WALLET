import React, { useState } from 'react';
import { mnemonicToSeed } from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';
import { Wallet, HDNodeWallet } from "ethers";

function BitCoinWallet({ mnemonic }) {
    const [index, setIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);

    const generateAddress = async () => {
        if (!mnemonic) {
            alert("Mnemonic phrase is required.");
            return;
        }

        try {
            // Convert mnemonic to seed
            const seed = await mnemonicToSeed(mnemonic);
            const derivationPath = `m/44'/0'/${index}'/0'`;
            const hdNode = HDNodeWallet.fromSeed(seed);
            const child = hdNode.derivePath(derivationPath);
            const privateKey = child.privateKey;
            const wallet = new Wallet(privateKey);
            // Update state
            setIndex(index + 1);
            setAddresses([...addresses, wallet.address]);
        } catch (error) {
            console.error("Error generating address:", error);
        }
    };

    return (
        <div>
            <button onClick={generateAddress}>
                Add Bitcoin Address
            </button>
            {addresses.map((address, idx) => (
                <div key={idx}>
                    {address}
                </div>
            ))}
        </div>
    );
}

export default BitCoinWallet;
