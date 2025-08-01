import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function useWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    const injectedConnector = connectors.find(c => c.type === 'injected');
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };

  return {
    address,
    isConnected,
    connect: handleConnect,
    disconnect,
  };
}