import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

import TokenLaunchPad from './components/TokenLaunchPad';

function App() {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    return (
        <>
            <div className='bg-gray-900'>
                <ConnectionProvider endpoint={endpoint}>
                    <WalletProvider wallets={[]} autoConnect>
                        <WalletModalProvider>
                            <header className="bg-gray-900 shadow p-4 flex justify-between items-center">
                                <WalletMultiButton className="wallet-button" />
                                <WalletDisconnectButton className="wallet-button" />
                            </header>

                            <main className="p-6 bg-gray-900 space-y-8 max-w-4xl mx-auto">
                                <TokenLaunchPad />
                            </main>
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </div>
        </>
    );
}

export default App;
