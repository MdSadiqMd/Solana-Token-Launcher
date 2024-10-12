import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    return (
        <>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={[]} autoConnect>
                    <WalletModalProvider>
                        <header className="app-header bg-white shadow p-4 flex justify-between items-center">
                            <WalletMultiButton className="wallet-button" />
                            <WalletDisconnectButton className="wallet-button" />
                        </header>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </>
    );
}

export default App;
