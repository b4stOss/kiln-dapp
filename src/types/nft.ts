/**
 * NFT Type Definitions
 * Basé sur la réponse API fournie dans l'énoncé
 */

export interface NFTAttribute {
  trait_type: string;
  value: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: NFTAttribute[];
}

export interface NFT {
  chainId: number;
  id: string;
  metadata: NFTMetadata;
  tokenAddress: `0x${string}`;  // Type Viem pour les adresses Ethereum
  tokenURI: string;
  type: string;
}

/**
 * Types pour la gestion des états de transaction
 * Pattern similaire aux Observables Angular mais adapté React
 */
export type TransactionStatus = 'idle' | 'pending' | 'success' | 'error';

export interface ClaimState {
  status: TransactionStatus;
  txHash?: `0x${string}`;
  error?: string;
}

/**
 * Types pour la configuration des contrats
 */
export interface ContractConfig {
  address: `0x${string}`;
  abi: readonly unknown[];
  chainId: number;
}