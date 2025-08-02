import { Title, Text, Flex, SimpleGrid } from '@mantine/core';
import type { NFT } from '../types/nft';

interface NFTDetailsProps {
  nft: NFT;
}

export function NFTDetails({ nft }: NFTDetailsProps) {
  return (
    <Flex justify="left" align="left" direction="column" gap='md'>
      <Title order={1} className="mb-4">
        {nft.metadata.name}
        <Text c="dimmed">You own 0</Text>
      </Title>

      <Text c="dimmed">{nft.metadata.description}</Text>

      <SimpleGrid cols={3}>
        {nft.metadata.attributes.map((attr, index) => (
          <Flex justify="left" align="left" direction="column" gap="xs" key={index} p="md" bd="1px solid dimmed">
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