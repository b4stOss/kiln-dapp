import { Group, Button } from '@mantine/core';
import { useWallet } from '../hooks/useWallet';
import kilnLogo from '../assets/kiln.svg';

export function Header() {
  const { address, isConnected, connect, disconnect } = useWallet();

  return (
    <header>
      <Group justify="space-between" pt="md">
        <img src={kilnLogo} alt="Kiln" height={32} />

        {isConnected ? (
          <Group>
            <span className="text-sm text-gray-600">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <Button variant="outline" onClick={() => disconnect()}>
              Disconnect
            </Button>
          </Group>
        ) : (
          <Button radius={0} onClick={connect}>
            Connect Wallet
          </Button>
        )}
      </Group>
    </header>
  );
}
