import { Text, Button, Group, Badge, Flex } from '@mantine/core';
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
    <Flex justify="left" align="left" direction="column" gap="md">      
      <div>
        <Badge color="black" radius={0}>Free Mint</Badge>
        <Group>
          <Text size="xl" fw={700}>≈ 0 ETH</Text>
        </Group>
      </div>

      {!isConnected ? (
        <Button radius={0} fullWidth onClick={connect}>
          Connect Wallet
        </Button>
      ) : (
        <Button 
          fullWidth 
          onClick={handleClaim}
          loading={claimState.status === 'pending' || isConfirming}
          radius={0}
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
    </Flex>
  );
}