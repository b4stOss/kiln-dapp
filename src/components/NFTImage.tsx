import { Card, Image } from '@mantine/core';
import type { NFT } from '../types/nft';
import { ipfsToHttp } from '../lib/ipfs';

interface NFTImageProps {
  nft: NFT;
}

export function NFTImage({ nft }: NFTImageProps) {
  return (
    <Card className="mb-6">
      <Image
        src={ipfsToHttp(nft.metadata.image)}
        alt={nft.metadata.name}
        radius="md"
        h={400}
        w="auto"
        fit="contain"
        className="mx-auto"
      />
    </Card>
  );
}