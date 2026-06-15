interface TransactionStatusProps {
  hash: string | null;
  error: string | null;
}

export function TransactionStatus({ hash, error }: TransactionStatusProps) {
  if (!hash && !error) return null;

  return (
    <div className={`card transaction-status ${hash ? 'success' : 'error'}`}>
      {hash && (
        <>
          <h3>Transaction Successful!</h3>
          <p>
            Hash:{' '}
            <a
              href={`https://stellar.expert/explorer/testnet/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <code>{hash.slice(0, 16)}...{hash.slice(-8)}</code>
            </a>
          </p>
        </>
      )}
      {error && (
        <>
          <h3>Transaction Failed</h3>
          <p className="error">{error}</p>
        </>
      )}
    </div>
  );
}
