import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { api } from '../lib/api';

export function useNFT(id: string) {
  return useQuery({
    queryKey: ['nft', id],
    queryFn: () => api.getNFT(id),
    enabled: !!id,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}