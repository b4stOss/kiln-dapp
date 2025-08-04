export function getCleanErrorMessage(error: string): string {
  if (error.includes('User rejected')) {
    return 'Transaction rejected by user';
  }
  
  if (error.includes('insufficient funds')) {
    return 'Insufficient funds for transaction';
  }
  
  if (error.includes('execution reverted')) {
    return 'Transaction failed - contract requirements not met';
  }
  
  if (error.includes('network')) {
    return 'Network error - please try again';
  }
  
  if (error.includes('gas')) {
    return 'Gas estimation failed - transaction may fail';
  }
  
  if (error.includes('nonce')) {
    return 'Transaction nonce error - please reset your wallet';
  }
  
  // Fallback pour les erreurs inconnues
  return 'Transaction failed - please try again';
}