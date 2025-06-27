
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface DatePickerFieldProps {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({ 
  date, 
  onSelect, 
  className,
  side = "bottom",
  sideOffset = 12,
  align = "start"
}) => {
  const isMobile = useIsMobile();
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-medium overflow-hidden bg-white border-2 border-input hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-ring focus:border-ring touch-manipulation transition-all duration-200",
            !date && "text-muted-foreground",
            isMobile && "min-h-[48px] text-base px-4 py-3",
            className
          )}
          style={{
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <CalendarIcon className={cn(
            "flex-shrink-0 text-muted-foreground",
            isMobile ? "mr-3 h-6 w-6" : "mr-3 h-5 w-5"
          )} />
          {date ? (
            <span className="truncate text-foreground font-medium">
              {format(date, isMobile ? "MMM d, yyyy" : "EEE, MMM d, yyyy")}
            </span>
          ) : (
            <span className="truncate text-muted-foreground">
              Date
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className={cn(
          "w-auto p-0 bg-white shadow-xl rounded-xl border-2 z-50",
          isMobile && "mx-4 w-[calc(100vw-2rem)] max-w-sm"
        )}
        align={isMobile ? "center" : align}
        side={isMobile ? "bottom" : side}
        sideOffset={isMobile ? 8 : sideOffset}
        avoidCollisions={true}
        collisionPadding={16}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
          className={cn(
            "border-0 pointer-events-auto",
            isMobile ? "p-4 text-base" : "p-4"
          )}
          modifiersClassNames={{
            selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            today: "font-bold bg-accent text-accent-foreground border border-primary"
          }}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          classNames={{
            day: cn(
              "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-md transition-colors",
              isMobile && "h-11 w-11 text-base touch-manipulation"
            ),
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground font-semibold",
            nav_button: cn(
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-accent rounded-md transition-all",
              isMobile && "h-10 w-10 touch-manipulation"
            ),
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: isMobile ? "text-base font-semibold" : "text-sm font-medium"
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerField;
