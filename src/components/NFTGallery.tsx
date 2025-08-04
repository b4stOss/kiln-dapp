import { Card, Image, Text, Title, Loader, Center, SimpleGrid, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { ipfsToHttp } from '../lib/ipfs';

interface NFTGalleryProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function NFTGallery({ selectedId, onSelect }: NFTGalleryProps) {
  const { data: nfts, isLoading } = useQuery({
    queryKey: ['nfts'],
    queryFn: api.getAllNFTs,
  });
  if (!nfts) return null;
  const otherNfts = nfts.filter((nft) => nft.id !== selectedId);

  if (isLoading) {
    return (
      <Stack gap="lg">
        <Title order={3}>More from this collection</Title>
        <Center>
          <Loader color="black.9" type="bars" />
        </Center>
      </Stack>
    );
  }

  return (
    <Stack gap="lg">
      <Title order={3}>More from this collection</Title>

      <SimpleGrid cols={4} spacing="lg">
        {otherNfts.map((nft) => (
          <Card
            key={nft.id}
            padding={0}
            radius={0}
            withBorder={false}
            style={{
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onClick={() => onSelect(nft.id)}
          >
            <Card.Section>
              <Image src={ipfsToHttp(nft.metadata.image)} alt={nft.metadata.name} height={200} radius={0} fit="cover" />
            </Card.Section>

            <Stack mt="xs" justify="flex-start" gap={0}>
              <Text fw={600}>
                {nft.metadata.name}
              </Text>
              <Text size="sm" c="dimmed">
                0.0 ETH
              </Text>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
