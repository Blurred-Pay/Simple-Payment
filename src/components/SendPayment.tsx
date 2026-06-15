import { useState } from 'react';
import { sendXlm } from '../utils/stellar';

interface SendPaymentProps {
  publicKey: string | null;
  onTransactionComplete: (hash: string) => void;
  onTransactionError: (error: string) => void;
}

export function SendPayment({ publicKey, onTransactionComplete, onTransactionError }: SendPaymentProps) {
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey || !destination || !amount) return;

    setIsSending(true);
    try {
      const hash = await sendXlm(publicKey, destination, amount);
      onTransactionComplete(hash);
      setDestination('');
      setAmount('');
    } catch (err: any) {
      const message = err?.message || err?.toString() || 'Transaction failed. Please try again.';
      onTransactionError(message);
    } finally {
      setIsSending(false);
    }
  };

  if (!publicKey) {
    return (
      <div className="card">
        <h2>Send XLM</h2>
        <p className="hint">Connect your wallet to send payments.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Send XLM</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="destination">Destination Address</label>
          <input
            id="destination"
            type="text"
            placeholder="G... or S..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount (XLM)</label>
          <input
            id="amount"
            type="number"
            step="0.0000001"
            min="0.00001"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={isSending || !destination || !amount}>
          {isSending ? 'Sending...' : 'Send XLM'}
        </button>
      </form>
    </div>
  );
}
