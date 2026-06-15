import { useState, useEffect, useCallback } from 'react';

export function useWallet() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    async function checkConnection() {
      try {
        const { isConnected, getAddress } = await import('@stellar/freighter-api');
        const { isConnected: connected } = await isConnected();
        if (connected) {
          const { address } = await getAddress();
          setPublicKey(address);
        }
      } catch {
        // Freighter not installed
      }
    }
    checkConnection();
  }, []);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      const { requestAccess } = await import('@stellar/freighter-api');
      const { address } = await requestAccess();
      setPublicKey(address);
    } catch (err) {
      throw new Error('Failed to connect wallet. Make sure Freighter is installed and unlocked.');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setPublicKey(null);
  }, []);

  return { publicKey, isConnecting, connect, disconnect };
}
