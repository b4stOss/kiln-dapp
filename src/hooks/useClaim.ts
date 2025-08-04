import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { notifications } from '@mantine/notifications';
import type { ClaimState } from '../types/nft';
import { getCleanErrorMessage } from '../utils/errorMessages';

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
  
  const { writeContract, data: hash, error: writeError } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed, error: receiptError } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed && hash) {
      notifications.hide('claiming');
      setClaimState({ status: 'success', txHash: hash });
      notifications.show({
        title: '✅ Claim Successful!',
        message: 'Your NFT has been successfully claimed and added to your wallet !',
        color: 'green',
        autoClose: 10000,
      });
    }
    if (receiptError) {
      notifications.hide('claiming');
      const cleanError = getCleanErrorMessage(receiptError.message || 'Transaction failed');
      setClaimState({ status: 'error', error: cleanError });
      notifications.show({
        title: '❌ Transaction Failed',
        message: cleanError,
        color: 'red',
        autoClose: 7000,
      });
    }
    if (writeError) {
      notifications.hide('claiming');
      const cleanError = getCleanErrorMessage(writeError.message || 'Transaction rejected');
      setClaimState({ status: 'error', error: cleanError });
      notifications.show({
        title: '❌ Transaction Error',
        message: cleanError,
        color: 'red',
        autoClose: 7000,
      });
    }
  }, [isConfirmed, receiptError, writeError, hash]);

  const claim = async (tokenId: string, to: `0x${string}`) => {
    try {
      setClaimState({ status: 'pending' });
      
      notifications.show({
        id: 'claiming',
        title: '⏳ Claiming NFT...',
        message: 'Please confirm the transaction in your wallet',
        color: 'black',
        loading: true,
        autoClose: false,
      });
      
      writeContract({
        address: contractAddress,
        abi: CLAIM_ABI,
        functionName: 'claim',
        args: [
          to, // _receiver
          BigInt(tokenId), // _tokenId  
          1n, // _quantity (1 NFT)
          '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // _currency (ETH native token)
          0n, // _pricePerToken (free mint)
          { // _allowlistProof (empty/default)
            proof: [],
            quantityLimitPerWallet: 0n,
            pricePerToken: 0n,
            currency: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
          },
          '0x' // _data (empty)
        ],
        value: 0n, // payableAmount (free)
      });
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