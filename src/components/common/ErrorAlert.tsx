import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorAlertProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  retryText?: string;
  className?: string;
  variant?: 'default' | 'destructive';
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title = 'Error',
  message,
  onRetry,
  onDismiss,
  retryText = 'Try Again',
  className,
  variant = 'destructive'
}) => {
  return (
    <Alert variant={variant} className={cn('relative', className)}>
      <AlertTriangle className="h-4 w-4" />
      
      {onDismiss && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2 h-6 w-6 p-0"
          onClick={onDismiss}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
      
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-2">
        {message}
      </AlertDescription>
      
      {onRetry && (
        <div className="mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="gap-2"
          >
            <RefreshCw className="h-3 w-3" />
            {retryText}
          </Button>
        </div>
      )}
    </Alert>
  );
};