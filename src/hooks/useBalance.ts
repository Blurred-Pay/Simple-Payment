import { useState, useEffect, useCallback } from 'react';
import { getBalance } from '../utils/stellar';

export function useBalance(publicKey: string | null) {
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!publicKey) {
      setBalance(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const bal = await getBalance(publicKey);
      setBalance(bal);
    } catch (err) {
      setError('Failed to fetch balance. Make sure your account is funded on testnet.');
      setBalance(null);
    } finally {
      setIsLoading(false);
    }
  }, [publicKey]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { balance, isLoading, error, refetch: fetchBalance };
}
