import { Text, Button, Group, Badge, Flex } from '@mantine/core';
import { useWallet } from '../hooks/useWallet';
import { useClaim } from '../hooks/useClaim';
import type { NFT } from '../types/nft';
import ethLogo from '../assets/eth.svg';

interface ClaimPanelProps {
  nft: NFT;
}

export function ClaimPanel({ nft }: ClaimPanelProps) {
  const { address, isConnected, isCorrectChain, connect, ensureCorrectChain } = useWallet();
  const { claim, claimState, isConfirming } = useClaim(nft.tokenAddress);

  const handleClaim = async () => {
    if (!address) return;
    
    if (!isCorrectChain) {
      await ensureCorrectChain();
      return;
    }
    
    await claim(nft.id, address);
  };

  return (
    <Flex justify="left" align="left" direction="column" gap="md">      
      <div>
        <Badge color="black" radius={0}>Free Mint</Badge>
        <Group gap="xs">
          <img src={ethLogo} alt="Kiln" height={32} />
          <Text size="xl" fw={700}>0 ETH</Text>
        </Group>
      </div>

      {!isConnected ? (
        <Button radius={0} fullWidth onClick={connect}>
          Connect Wallet
        </Button>
      ) : !isCorrectChain ? (
        <Button radius={0} fullWidth onClick={ensureCorrectChain}>
          Switch to Base Sepolia
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

      {claimState.status === 'success' && claimState.txHash && (
        <Text size="sm" style={{ color: '#28a745' }}>
          ✅ Successfully claimed! 
          <br />
          <Text 
            component="a" 
            href={`https://sepolia.basescan.org/tx/${claimState.txHash}`}
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'underline', color: '#28a745' }}
          >
            View on BaseScan
          </Text>
        </Text>
      )}

      {claimState.status === 'error' && (
        <Text size="sm" style={{ color: '#dc3545' }}>
          ❌ {claimState.error}
        </Text>
      )}
    </Flex>
  );
}