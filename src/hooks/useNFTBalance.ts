import { useReadContract } from 'wagmi';
import { useWallet } from './useWallet';

const ERC1155_ABI = [
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'id', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

export function useNFTBalance(contractAddress: `0x${string}`, tokenId: string) {
  const { address, isConnected } = useWallet();

  const { data: balance, isLoading, refetch } = useReadContract({
    address: contractAddress,
    abi: ERC1155_ABI,
    functionName: 'balanceOf',
    args: address && isConnected ? [address, BigInt(tokenId)] : undefined,
    query: {
      enabled: !!address && isConnected,
    }
  });

  return {
    balance: balance ? Number(balance) : 0,
    isLoading,
    isConnected,
    refetch
  };
}