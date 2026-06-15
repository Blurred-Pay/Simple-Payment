import { useState } from 'react';
import { useWallet } from './hooks/useWallet';
import { useBalance } from './hooks/useBalance';
import { WalletConnect } from './components/WalletConnect';
import { BalanceCard } from './components/BalanceCard';
import { SendPayment } from './components/SendPayment';
import { TransactionStatus } from './components/TransactionStatus';
import './App.css';

export default function App() {
  const { publicKey, isConnecting, connect, disconnect } = useWallet();
  const { balance, isLoading: balanceLoading, error: balanceError, refetch } = useBalance(publicKey);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [txError, setTxError] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      await connect();
    } catch (err: any) {
      setTxError(err.message);
    }
  };

  const handleTransactionComplete = (hash: string) => {
    setTxHash(hash);
    setTxError(null);
    refetch();
  };

  const handleTransactionError = (error: string) => {
    setTxError(error);
    setTxHash(null);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Stellar Payment dApp</h1>
        <p>Send XLM on the Stellar Testnet</p>
        <WalletConnect
          publicKey={publicKey}
          isConnecting={isConnecting}
          onConnect={handleConnect}
          onDisconnect={disconnect}
        />
      </header>

      <main className="main">
        <BalanceCard
          balance={balance}
          isLoading={balanceLoading}
          error={balanceError}
          publicKey={publicKey}
          onRefetch={refetch}
        />
        <SendPayment
          publicKey={publicKey}
          onTransactionComplete={handleTransactionComplete}
          onTransactionError={handleTransactionError}
        />
        <TransactionStatus hash={txHash} error={txError} />
      </main>
    </div>
  );
}
