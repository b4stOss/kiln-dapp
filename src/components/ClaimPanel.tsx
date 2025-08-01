import { Card, Title, Text, Button, Group } from '@mantine/core';
import { useWallet } from '../hooks/useWallet';
import { useClaim } from '../hooks/useClaim';
import type { NFT } from '../types/nft';

interface ClaimPanelProps {
  nft: NFT;
}

export function ClaimPanel({ nft }: ClaimPanelProps) {
  const { address, isConnected, connect } = useWallet();
  const { claim, claimState, isConfirming } = useClaim(nft.tokenAddress);

  const handleClaim = async () => {
    if (!address) return;
    await claim(nft.id, address);
  };

  return (
    <Card className="sticky top-4">
      <Title order={2} className="mb-4">
        {nft.metadata.name}
      </Title>
      
      <Text className="mb-2 text-sm text-gray-500">You own 0</Text>
      
      <div className="mb-6">
        <Text className="text-sm text-gray-500 mb-1">Free Mint</Text>
        <Group>
          <Text size="xl" fw={700}>≈ 0 ETH</Text>
        </Group>
      </div>

      {!isConnected ? (
        <Button fullWidth onClick={connect}>
          Connect Wallet
        </Button>
      ) : (
        <Button 
          fullWidth 
          onClick={handleClaim}
          loading={claimState.status === 'pending' || isConfirming}
        >
          {claimState.status === 'pending' ? 'Claiming...' : 
           isConfirming ? 'Confirming...' : 
           'Claim Now'}
        </Button>
      )}

      {claimState.status === 'success' && (
        <Text size="sm" className="mt-2 text-green-600">
          Successfully claimed! TX: {claimState.txHash?.slice(0, 10)}...
        </Text>
      )}

      {claimState.status === 'error' && (
        <Text size="sm" className="mt-2 text-red-600">
          Error: {claimState.error}
        </Text>
      )}
    </Card>
  );
}