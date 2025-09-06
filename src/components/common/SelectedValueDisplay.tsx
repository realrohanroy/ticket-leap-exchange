import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SelectedValueDisplayProps {
  values: Array<{
    label: string;
    value: string;
    onRemove?: () => void;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  }>;
  className?: string;
  title?: string;
}

export const SelectedValueDisplay: React.FC<SelectedValueDisplayProps> = ({
  values,
  className,
  title = 'Selected Values'
}) => {
  if (values.length === 0) return null;

  return (
    <div className={cn('space-y-2', className)}>
      {title && (
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {values.map((item, index) => (
          <Badge 
            key={`${item.value}-${index}`}
            variant={item.variant || 'secondary'}
            className={cn(
              'flex items-center gap-1 px-3 py-1.5 text-sm transition-all duration-200',
              'bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20',
              item.onRemove && 'pr-1'
            )}
          >
            <span className="truncate max-w-[200px]">{item.label}</span>
            {item.onRemove && (
              <button
                onClick={item.onRemove}
                className="ml-1 h-4 w-4 rounded-full hover:bg-primary/30 flex items-center justify-center transition-colors"
                aria-label={`Remove ${item.label}`}
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </Badge>
        ))}
      </div>
    </div>
  );
};