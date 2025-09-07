import { supabase } from '@/integrations/supabase/client';
import { ApiResponse, PaginatedResponse } from '@/types/common';

/**
 * Generic API error handler
 */
export function handleApiError(error: any): ApiResponse {
  console.error('API Error:', error);
  
  const message = error?.message || 'An unexpected error occurred';
  
  return {
    success: false,
    error: message,
    message
  };
}

/**
 * Create a successful API response
 */
export function createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message
  };
}

/**
 * Create a paginated response
 */
export function createPaginatedResponse<T>(
  data: T[], 
  total: number, 
  page: number, 
  limit: number
): PaginatedResponse<T> {
  return {
    success: true,
    data,
    total,
    page,
    limit,
    hasMore: (page * limit) < total
  };
}

/**
 * Check if user is authenticated
 */
export async function checkAuth(): Promise<boolean> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  } catch {
    return false;
  }
}

/**
 * Get current user ID
 */
export async function getCurrentUserId(): Promise<string | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || null;
  } catch {
    return null;
  }
}

/**
 * Retry async operation with exponential backoff
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}