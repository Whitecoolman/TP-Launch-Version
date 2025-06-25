import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { metaApiService, type CreateAccountParams, type MetaAccount } from '../api/meta-api';

export function useMetaAccounts() {
  return useQuery({
    queryKey: ['meta-accounts'],
    queryFn: () => metaApiService.getAccounts('313902'), // Using demo account ID
    staleTime: 30000,
    enabled: true // Enable auto-fetching
  });
}

export function useCreateMetaAccount() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (params: Omit<CreateAccountParams, 'userId'>) => {
      return metaApiService.createAccount({
        ...params,
        userId: '313902' // Using demo account ID
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meta-accounts'] });
    }
  });
}

export function useDeleteMetaAccount() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (accountId: string) => metaApiService.deleteAccount(accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meta-accounts'] });
    }
  });
}

export function useRefreshMetaAccount() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (accountId: string) => metaApiService.refreshAccount(accountId),
    onSuccess: (updatedAccount) => {
      queryClient.invalidateQueries({ queryKey: ['meta-accounts'] });
      return updatedAccount;
    }
  });
}