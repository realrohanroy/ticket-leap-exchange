
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
  side = "right",
  sideOffset = 12,
  align = "start"
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-medium overflow-hidden text-foreground",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
          {date ? (
            <span className="truncate">
              {format(date, "EEE, MMM d, yyyy")}
            </span>
          ) : (
            <span className="truncate">Select Travel Date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0 bg-white shadow-lg rounded-lg"
        align={align}
        side={side}
        sideOffset={sideOffset}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
          className="border-0 pointer-events-auto"
          modifiersClassNames={{
            selected: "bg-primary text-primary-foreground",
            today: "font-bold"
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerField;
