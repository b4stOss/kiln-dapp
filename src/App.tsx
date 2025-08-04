import { useState } from 'react';
import { Container, Grid, Loader, Center, Flex, Stack, Space, Divider } from '@mantine/core';
import { useNFT } from './hooks/useNFT';
import { Header } from './components/Header';
import { NFTImage } from './components/NFTImage';
import { NFTDetails } from './components/NFTDetails';
import { ClaimPanel } from './components/ClaimPanel';
import { NFTGallery } from './components/NFTGallery';
import { Footer } from './components/Footer';
import { InfoCard } from './components/InfoCard';

function App() {
  const [selectedNFTId, setSelectedNFTId] = useState('2'); // Start avec KILN #3
  const { data: nft, isLoading, error } = useNFT(selectedNFTId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Center className="h-96">
          <Loader color="black.9" type="bars" />
        </Center>
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;
  if (!nft) return <div>NFT not found</div>;

  return (
    <Container size={1440}>
      <Header />
      <Space h="lg" />

      <Container size={1280} mt="xl">
        <Stack align="stretch" justify="flex-start" gap="xl">
          {/* Main Content */}
          <Grid gutter={32}>
            <Grid.Col span={6}>
              <NFTImage nft={nft} />
              <Space h="md" />
              <InfoCard />
            </Grid.Col>
            <Grid.Col span={6}>
              <Flex justify="left" align="left" direction="column" gap="xl">
                <NFTDetails nft={nft} />
                <Divider color="dimmed" />
                <ClaimPanel nft={nft} />
              </Flex>
            </Grid.Col>
          </Grid>

          {/* Gallery */}
          <NFTGallery selectedId={selectedNFTId} onSelect={setSelectedNFTId} />
        </Stack>
      </Container>

      <Footer />
    </Container>
  );
}

export default App;
