interface WalletConnectProps {
  publicKey: string | null;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function WalletConnect({ publicKey, isConnecting, onConnect, onDisconnect }: WalletConnectProps) {
  if (publicKey) {
    return (
      <div className="wallet-connected">
        <p className="wallet-address">
          Connected: <code>{publicKey.slice(0, 8)}...{publicKey.slice(-4)}</code>
        </p>
        <button className="btn btn-secondary" onClick={onDisconnect}>
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button className="btn btn-primary" onClick={onConnect} disabled={isConnecting}>
      {isConnecting ? 'Connecting...' : 'Connect Freighter Wallet'}
    </button>
  );
}
