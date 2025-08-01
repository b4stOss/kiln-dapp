import { Card, Title, Text, Badge, Group } from '@mantine/core';
import type { NFT } from '../types/nft';

interface NFTDetailsProps {
  nft: NFT;
}

export function NFTDetails({ nft }: NFTDetailsProps) {
  return (
    <Card>
      <Title order={1} className="mb-4">
        {nft.metadata.name}
      </Title>
      
      <Text className="mb-6 text-gray-600">
        {nft.metadata.description}
      </Text>

      <div className="space-y-4">
        {nft.metadata.attributes.map((attr, index) => (
          <Group key={index} justify="space-between">
            <Text size="sm" className="text-gray-500 uppercase">
              {attr.trait_type}
            </Text>
            <Badge variant="light">
              {attr.value}
            </Badge>
          </Group>
        ))}
      </div>
    </Card>
  );
}