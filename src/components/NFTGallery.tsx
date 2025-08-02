import { Card, Image, Text, Title, Loader, Center, Container, Flex, SimpleGrid } from '@mantine/core';
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
      <Container fluid>
        <Title order={3} className="mb-4">
          More from this collection
        </Title>
        <Center>
          <Loader color="black.9" type="bars" />
        </Center>
      </Container>
    );
  }

  return (
    <Flex justify="center" align="flex-start" direction="column" gap="sm">
      <Title order={5} className="mb-4">
        More from this collection
      </Title>

      <SimpleGrid cols={4}>
        {otherNfts.map((nft) => (
          <Card
            key={nft.id}
            className={`cursor-pointer transition-all hover:scale-105 ${selectedId === nft.id ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => onSelect(nft.id)}
          >
            <Image src={ipfsToHttp(nft.metadata.image)} alt={nft.metadata.name} h={300} w={300} radius="sm" fit="cover" />
            <Text size="sm" className="mt-2 text-center font-medium">
              {nft.metadata.name}
            </Text>
            <Text size="xs" className="text-center text-gray-500">
              0.0 ETH
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Flex>
  );
}
