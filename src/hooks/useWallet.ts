import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';

export function useWallet() {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const handleConnect = () => {
    const injectedConnector = connectors.find(c => c.type === 'injected');
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };

  const ensureCorrectChain = async () => {
    if (chainId !== baseSepolia.id) {
      await switchChain({ chainId: baseSepolia.id });
    }
  };

  return {
    address,
    isConnected,
    chainId,
    isCorrectChain: chainId === baseSepolia.id,
    connect: handleConnect,
    disconnect,
    ensureCorrectChain,
  };
}