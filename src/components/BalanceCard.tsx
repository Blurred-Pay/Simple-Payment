interface BalanceCardProps {
  balance: string | null;
  isLoading: boolean;
  error: string | null;
  publicKey: string | null;
  onRefetch: () => void;
}

export function BalanceCard({ balance, isLoading, error, publicKey, onRefetch }: BalanceCardProps) {
  if (!publicKey) return null;

  return (
    <div className="card">
      <h2>XLM Balance</h2>
      {isLoading && <p className="loading">Loading balance...</p>}
      {error && <p className="error">{error}</p>}
      {!isLoading && !error && balance !== null && (
        <p className="balance">{parseFloat(balance).toFixed(7)} XLM</p>
      )}
      <button className="btn btn-secondary" onClick={onRefetch} disabled={isLoading}>
        Refresh Balance
      </button>
    </div>
  );
}
