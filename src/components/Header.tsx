import { Group, Button, Container } from '@mantine/core';
import { useWallet } from '../hooks/useWallet';

export function Header() {
  const { address, isConnected, connect, disconnect } = useWallet();

  return (
    <header className="bg-white border-b">
      <Container size="xl" py="md">
        <Group justify="space-between">
          <div className="text-xl font-bold">Kiln</div>
          
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
            <Button onClick={connect}>
              Connect Wallet
            </Button>
          )}
        </Group>
      </Container>
    </header>
  );
}