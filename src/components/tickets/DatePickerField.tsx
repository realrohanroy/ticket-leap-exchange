
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
            "w-full justify-start text-left font-medium overflow-hidden bg-background border-2 hover:bg-accent hover:text-accent-foreground focus:ring-4 focus:ring-primary/20 focus:border-primary touch-manipulation transition-all duration-300",
            !date && "text-muted-foreground border-border",
            date && "border-primary/40 bg-primary/5 text-foreground font-semibold",
            isMobile && "min-h-[56px] text-base px-6 py-4 rounded-2xl",
            !isMobile && "min-h-[44px] rounded-xl px-4 py-3",
            className
          )}
          style={{
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <CalendarIcon className={cn(
            "flex-shrink-0",
            date ? "text-primary" : "text-muted-foreground",
            isMobile ? "mr-4 h-7 w-7" : "mr-3 h-5 w-5"
          )} />
          {date ? (
            <span className="truncate text-foreground font-bold">
              {format(date, isMobile ? "EEEE, MMMM d, yyyy" : "EEE, MMM d, yyyy")}
            </span>
          ) : (
            <span className="truncate text-muted-foreground font-medium">
              Select travel date
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className={cn(
          "w-auto p-0 bg-background/95 backdrop-blur-lg shadow-2xl border-2 border-primary/20 z-50",
          isMobile ? "mx-4 w-[calc(100vw-2rem)] max-w-sm rounded-3xl" : "rounded-2xl"
        )}
        align={isMobile ? "center" : align}
        side={isMobile ? "bottom" : side}
        sideOffset={isMobile ? 12 : sideOffset}
        avoidCollisions={true}
        collisionPadding={20}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
          className={cn(
            "border-0 pointer-events-auto",
            isMobile ? "p-6 text-base" : "p-5"
          )}
          modifiersClassNames={{
            selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            today: "font-bold bg-accent text-accent-foreground border border-primary"
          }}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          classNames={{
            day: cn(
              "p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-xl transition-all duration-200",
              isMobile ? "h-12 w-12 text-base touch-manipulation font-medium" : "h-9 w-9"
            ),
            day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground font-bold shadow-lg",
            day_today: "bg-accent text-accent-foreground font-bold border-2 border-primary/30",
            nav_button: cn(
              "bg-transparent p-0 opacity-60 hover:opacity-100 hover:bg-accent rounded-xl transition-all duration-200",
              isMobile ? "h-12 w-12 touch-manipulation" : "h-8 w-8"
            ),
            caption: "flex justify-center pt-2 relative items-center mb-2",
            caption_label: isMobile ? "text-lg font-bold text-foreground" : "text-base font-semibold text-foreground"
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerField;
