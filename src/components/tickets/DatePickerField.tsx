
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-medium overflow-hidden text-foreground bg-white border-input hover:bg-accent hover:text-accent-foreground touch-manipulation",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-3 h-5 w-5 flex-shrink-0" />
          {date ? (
            <span className="truncate text-foreground">
              {format(date, "EEE, MMM d, yyyy")}
            </span>
          ) : (
            <span className="truncate">Select Travel Date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0 bg-white shadow-xl rounded-lg border-2 z-50"
        align={align}
        side={side}
        sideOffset={sideOffset}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
          className="border-0 pointer-events-auto p-4"
          modifiersClassNames={{
            selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            today: "font-bold bg-accent text-accent-foreground"
          }}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerField;
