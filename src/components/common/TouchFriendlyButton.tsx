import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TouchFriendlyButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
  className?: string;
  isMobile?: boolean;
}

export const TouchFriendlyButton = React.forwardRef<HTMLButtonElement, TouchFriendlyButtonProps>(
  ({ children, className, isMobile = false, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        type={props.type ?? 'button'}
        className={cn(
          'transition-all duration-200 ease-in-out touch-manipulation',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'active:scale-95 transform',
          isMobile && [
            'min-h-[48px] text-base px-6 py-3',
            'hover:shadow-lg active:shadow-sm'
          ],
          className
        )}
        style={{
          WebkitTapHighlightColor: 'transparent'
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
TouchFriendlyButton.displayName = 'TouchFriendlyButton';