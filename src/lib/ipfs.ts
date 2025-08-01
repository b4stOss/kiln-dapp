/**
 * Convertit une URL IPFS en URL HTTP via un gateway
 * ipfs://hash -> https://gateway.pinata.cloud/ipfs/hash
 */
export function ipfsToHttp(ipfsUrl: string): string {
  if (!ipfsUrl.startsWith('ipfs://')) {
    return ipfsUrl; // Déjà une URL HTTP
  }
  
  const hash = ipfsUrl.replace('ipfs://', '');
  return `https://gateway.pinata.cloud/ipfs/${hash}`;
}