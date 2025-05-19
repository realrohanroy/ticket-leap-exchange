
import React from 'react';
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateTimeFieldsProps {
  date?: Date;
  departureTime?: string;
  onDateSelect: (date: Date | undefined) => void;
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeToggle: () => void;
  formErrors: {[key: string]: boolean};
}

const DateTimeFields: React.FC<DateTimeFieldsProps> = ({
  date,
  departureTime,
  onDateSelect,
  onTimeChange,
  onTimeToggle,
  formErrors
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="travelDate" className={cn(formErrors.travelDate && "text-destructive")}>Travel Date *</Label>
        <Popover>
          <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  date ? "bg-white text-black" : "text-muted-foreground",
                  "transition-colors duration-200 ease-in-out",
                  formErrors.travelDate && "border-destructive"
                )}
                aria-label={date ? format(date, "PPP") : "Pick a date"}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onDateSelect}
              initialFocus
              disabled={(date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        {formErrors.travelDate && <p className="text-xs text-destructive">Travel Date is required</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="departureTime">Departure Time (Optional)</Label>
        <div className="flex items-center gap-2">
          <Input
            id="departureTime"
            name="departureTime"
            type="time"
            value={departureTime || ""}
            onChange={onTimeChange}
            className="w-full"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onTimeToggle}
          >
            {departureTime &&
            parseInt(departureTime.split(":")[0]) >= 12
              ? "PM"
              : "AM"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Format: HH:MM (24-hour) or use AM/PM toggle
        </p>
      </div>
    </div>
  );
};

export default DateTimeFields;
