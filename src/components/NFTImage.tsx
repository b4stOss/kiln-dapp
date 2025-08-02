import { Image } from '@mantine/core';
import type { NFT } from '../types/nft';
import { ipfsToHttp } from '../lib/ipfs';

interface NFTImageProps {
  nft: NFT;
}

export function NFTImage({ nft }: NFTImageProps) {
  return <Image src={ipfsToHttp(nft.metadata.image)} alt={nft.metadata.name} h={608} w={608} />;
}
