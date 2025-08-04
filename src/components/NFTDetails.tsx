import { Title, Text, Flex, SimpleGrid, Group, ActionIcon } from '@mantine/core';
import { IconShare, IconHeart } from '@tabler/icons-react';
import type { NFT } from '../types/nft';
import { useNFTBalance } from '../hooks/useNFTBalance';

interface NFTDetailsProps {
  nft: NFT;
}

export function NFTDetails({ nft }: NFTDetailsProps) {
  const { balance, isLoading, isConnected } = useNFTBalance(nft.tokenAddress, nft.id);

  const getOwnershipText = () => {
    if (!isConnected) return "Connect wallet to see ownership";
    if (isLoading) return "Loading...";
    return `You own ${balance}`;
  };

  return (
    <Flex justify="left" align="left" direction="column" gap='md'>
      <Group justify="space-between" align="flex-start">
        <div>
          <Title order={1}>
            {nft.metadata.name}
          </Title>
          <Text c="dimmed">{getOwnershipText()}</Text>
        </div>
        
        <Group gap="xs">
          <ActionIcon variant="subtle" color="gray" size="lg">
            <IconShare size={20} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray" size="lg">
            <IconHeart size={20} />
          </ActionIcon>
        </Group>
      </Group>

      <Text c="dimmed">{nft.metadata.description}</Text>

      <SimpleGrid cols={3}>
        {nft.metadata.attributes.map((attr, index) => (
          <Flex justify="left" align="left" direction="column" gap="xs" key={index} p="sm" bd="1px solid dimmed">
            <Text c="dimmed">
              {attr.trait_type.toUpperCase()}
            </Text>
            <Text>{attr.value}</Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Flex>
  );
}