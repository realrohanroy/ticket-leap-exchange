
import { useNavigate } from 'react-router-dom';

// Helper function that wraps the useNavigate hook in a try-catch
export function useNavigateWithFallback() {
  try {
    return useNavigate();
  } catch (e) {
    console.warn("Router context not available. Navigation will be disabled.");
    return undefined;
  }
}
