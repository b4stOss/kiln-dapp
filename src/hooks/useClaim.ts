import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import type { ClaimState } from '../types/nft';

const CLAIM_ABI = [
  {
    type: 'function',
    name: 'claim',
    inputs: [
      { name: '_receiver', type: 'address' },
      { name: '_tokenId', type: 'uint256' },
      { name: '_quantity', type: 'uint256' },
      { name: '_currency', type: 'address' },
      { name: '_pricePerToken', type: 'uint256' },
      { name: '_allowlistProof', type: 'tuple', components: [
        { name: 'proof', type: 'bytes32[]' },
        { name: 'quantityLimitPerWallet', type: 'uint256' },
        { name: 'pricePerToken', type: 'uint256' },
        { name: 'currency', type: 'address' }
      ]},
      { name: '_data', type: 'bytes' }
    ],
    outputs: [],
    stateMutability: 'payable'
  }
] as const;

export function useClaim(contractAddress: `0x${string}`) {
  const [claimState, setClaimState] = useState<ClaimState>({ status: 'idle' });
  
  const { writeContract, data: hash } = useWriteContract();
  
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });

  const claim = async (tokenId: string, to: `0x${string}`) => {
    try {
      setClaimState({ status: 'pending' });
      
      writeContract({
        address: contractAddress,
        abi: CLAIM_ABI,
        functionName: 'claim',
        args: [
          to, // _receiver
          BigInt(tokenId), // _tokenId  
          1n, // _quantity (1 NFT)
          '0x0000000000000000000000000000000000000000', // _currency (ETH = address zero)
          0n, // _pricePerToken (free mint)
          { // _allowlistProof (empty/default)
            proof: [],
            quantityLimitPerWallet: 0n,
            pricePerToken: 0n,
            currency: '0x0000000000000000000000000000000000000000'
          },
          '0x' // _data (empty)
        ],
        value: 0n, // payableAmount (free)
      });

      if (hash) {
        setClaimState({ status: 'success', txHash: hash });
      }
    } catch (error) {
      setClaimState({ 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };

  return {
    claim,
    claimState,
    isConfirming,
  };
}