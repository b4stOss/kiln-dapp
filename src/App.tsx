import { useState } from 'react';
import { Container, Grid, Loader, Center, Flex } from '@mantine/core';
import { useNFT } from './hooks/useNFT';
import { Header } from './components/Header';
import { NFTImage } from './components/NFTImage';
import { NFTDetails } from './components/NFTDetails';
import { ClaimPanel } from './components/ClaimPanel';
import { NFTGallery } from './components/NFTGallery';
import { Footer } from './components/Footer';

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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <Container size="xl" py="xl">
        {/* Main Content */}
        <Grid className="mb-8">
          <Grid.Col span={6}>
            <NFTImage nft={nft} />
          </Grid.Col>
          <Grid.Col span={4}>
            <Flex justify="left" align="left" direction="column">
              <NFTDetails nft={nft} />
              <ClaimPanel nft={nft} />
            </Flex>
          </Grid.Col>
        </Grid>

        {/* Gallery */}
        <NFTGallery selectedId={selectedNFTId} onSelect={setSelectedNFTId} />
      </Container>

      <Footer />
    </div>
  );
}

export default App;
