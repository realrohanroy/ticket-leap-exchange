import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export interface AsyncOperationState {
  isLoading: boolean;
  error: string | null;
  retryCount: number;
}

export interface AsyncOperationReturn<T> {
  execute: (operation: () => Promise<T>) => Promise<T | null>;
  executeWithRetry: (operation: () => Promise<T>, maxRetries?: number) => Promise<T | null>;
  isLoading: boolean;
  error: string | null;
  retryCount: number;
  reset: () => void;
}

export function useAsyncOperation<T = any>(
  options: {
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
  } = {}
): AsyncOperationReturn<T> {
  const [state, setState] = useState<AsyncOperationState>({
    isLoading: false,
    error: null,
    retryCount: 0
  });

  const execute = useCallback(async (operation: () => Promise<T>): Promise<T | null> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await operation();
      
      setState(prev => ({ ...prev, isLoading: false, error: null }));
      
      if (options.showSuccessToast && options.successMessage) {
        toast.success(options.successMessage);
      }
      
      if (options.onSuccess) {
        options.onSuccess(result);
      }
      
      return result;
    } catch (error: any) {
      const errorMessage = error?.message || options.errorMessage || 'An error occurred';
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage 
      }));
      
      if (options.showErrorToast) {
        toast.error(errorMessage);
      }
      
      if (options.onError) {
        options.onError(error);
      }
      
      return null;
    }
  }, [options]);

  const executeWithRetry = useCallback(async (
    operation: () => Promise<T>, 
    maxRetries: number = 3
  ): Promise<T | null> => {
    let lastError: any;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      setState(prev => ({ ...prev, retryCount: attempt }));
      
      try {
        return await execute(operation);
      } catch (error) {
        lastError = error;
        
        if (attempt < maxRetries) {
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }
    
    // If all retries failed, handle the final error
    const errorMessage = lastError?.message || options.errorMessage || 'Operation failed after retries';
    
    setState(prev => ({ 
      ...prev, 
      isLoading: false, 
      error: errorMessage 
    }));
    
    if (options.showErrorToast) {
      toast.error(`${errorMessage} (${maxRetries + 1} attempts)`);
    }
    
    return null;
  }, [execute, options]);

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      retryCount: 0
    });
  }, []);

  return {
    execute,
    executeWithRetry,
    isLoading: state.isLoading,
    error: state.error,
    retryCount: state.retryCount,
    reset
  };
}