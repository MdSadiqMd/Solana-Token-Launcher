import React, { useState } from "react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { MINT_SIZE, TOKEN_2022_PROGRAM_ID, createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint } from "@solana/spl-token";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TokenInputField } from "@/types/tokenInputs.types";

const TokenLaunchPad = () => {
    const { connection } = useConnection();
    const wallet = useWallet();

    const [inputs, setInputs] = useState<{
        name: string;
        symbol: string;
        imageUrl: string;
        initialSupply: string;
    }>({
        name: "",
        symbol: "",
        imageUrl: "",
        initialSupply: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const inputFields: TokenInputField[] = [
        { label: "Name", name: "name", value: inputs.name, onChange: handleInputChange, required: true },
        { label: "Symbol", name: "symbol", value: inputs.symbol, onChange: handleInputChange, required: true },
        { label: "Image URL", name: "imageUrl", value: inputs.imageUrl, onChange: handleInputChange, required: true },
        { label: "Initial Supply", name: "initialSupply", value: inputs.initialSupply, onChange: handleInputChange, required: true },
    ];

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!wallet.publicKey) {
            console.error("Wallet not connected");
            return;
        }

        const mintKeypair = Keypair.generate();
        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: mintKeypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_2022_PROGRAM_ID,
            }),
            createInitializeMint2Instruction(
                mintKeypair.publicKey,
                9,
                wallet.publicKey,
                wallet.publicKey,
                TOKEN_2022_PROGRAM_ID
            )
        );

        transaction.feePayer = wallet.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.partialSign(mintKeypair);

        try {
            await wallet.sendTransaction(transaction, connection);
            console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
        } catch (error) {
            console.error("Failed to create token:", error);
        }
    };

    return (
        <form
            className="space-y-6 bg-gray-900 p-6 rounded-lg shadow-lg text-white max-w-lg mx-auto"
            onSubmit={handleSubmit}
        >
            <h2 className="text-3xl font-bold text-center text-gray-100">Token LaunchPad</h2>
            <p className="text-center text-gray-400 mb-6">
                Launch your token with ease in a few simple steps.
            </p>
            {inputFields.map(({ label, name, value, onChange, required }) => (
                <div key={label} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        {label}
                    </label>
                    <Input
                        name={name}
                        type="text"
                        placeholder={label}
                        value={value}
                        onChange={onChange}
                        required={required}
                        className="bg-gray-800 text-gray-200 border-gray-600 placeholder-gray-500 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
            ))}
            <Button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none focus:ring-opacity-50"
            >
                Create a Token
            </Button>
        </form>
    );
};

export default TokenLaunchPad;
