
import React from 'react';
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TouchFriendlyButton } from "@/components/common/TouchFriendlyButton";
import { SelectedValueDisplay } from "@/components/common/SelectedValueDisplay";
import { CalendarIcon, Clock } from "lucide-react";
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
  
  // Create selected values for display
  const selectedValues = [];
  if (date) {
    selectedValues.push({
      label: `Date: ${format(date, "MMM d, yyyy")}`,
      value: format(date, "yyyy-MM-dd"),
      variant: 'default' as const,
      onRemove: () => onDateSelect(undefined)
    });
  }
  if (departureTime) {
    const timeFormatted = format(new Date(`2000-01-01T${departureTime}`), "h:mm a");
    selectedValues.push({
      label: `Time: ${timeFormatted}`,
      value: departureTime,
      variant: 'outline' as const,
      onRemove: () => onTimeChange({ target: { name: 'departureTime', value: '' } } as React.ChangeEvent<HTMLInputElement>)
    });
  }

  return (
    <div className="space-y-4 form-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label 
            htmlFor="travelDate" 
            className={cn(
              "text-sm font-medium transition-colors",
              formErrors.travelDate && "text-destructive",
              "after:content-['*'] after:ml-0.5 after:text-destructive"
            )}
          >
            Travel Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <TouchFriendlyButton
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-background",
                  !date && "text-muted-foreground",
                  formErrors.travelDate && "border-destructive focus-visible:ring-destructive",
                  "hover:bg-accent hover:text-accent-foreground"
                )}
                aria-label={date ? format(date, "PPP") : "Pick a date"}
                aria-invalid={!!formErrors.travelDate}
                aria-describedby={formErrors.travelDate ? "travelDate-error" : undefined}
              >
                <CalendarIcon className={cn(
                  "mr-2 flex-shrink-0",
                  "h-5 w-5"
                )} />
                <span className="truncate">
                  {date ? format(date, "PPP") : "Pick a date"}
                </span>
              </TouchFriendlyButton>
            </PopoverTrigger>
            <PopoverContent 
              className={cn(
                "w-auto p-0 bg-white shadow-xl rounded-xl border"
              )} 
              align="start"
              side="bottom"
              sideOffset={8}
              avoidCollisions={true}
              collisionPadding={16}
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => {
                  onDateSelect(d);
                }}
                initialFocus
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                className={cn(
                  "border-0 pointer-events-auto p-3"
                )}
                classNames={{
                  day: cn(
                    "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-md transition-colors"
                  ),
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground font-semibold",
                  nav_button: cn(
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-accent rounded-md transition-all touch-manipulation"
                  ),
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium"
                }}
              />
            </PopoverContent>
          </Popover>
          {formErrors.travelDate && (
            <p id="travelDate-error" className="text-xs text-destructive animate-fade-in">
              Travel Date is required
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="departureTime" className="text-sm font-medium">
            Departure Time <span className="text-muted-foreground">(Optional)</span>
          </Label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Clock className={cn(
                "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
              )} />
              <Input
                id="departureTime"
                name="departureTime"
                type="time"
                value={departureTime || ""}
                onChange={onTimeChange}
                className={cn(
                  "pl-10 transition-all duration-200 focus-ring"
                )}
                placeholder="HH:MM"
                pattern="[0-9]{2}:[0-9]{2}"
              />
            </div>
            {departureTime && (
              <TouchFriendlyButton
                type="button"
                variant="outline"
                size="sm"
                onClick={onTimeToggle}
                className="flex-shrink-0"
                aria-label="Toggle AM/PM"
              >
                {parseInt(departureTime.split(":")[0]) >= 12 ? "PM" : "AM"}
              </TouchFriendlyButton>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Format: HH:MM (24-hour) {departureTime && "or use AM/PM toggle"}
          </p>
        </div>
      </div>

      {/* Selected values display */}
      <SelectedValueDisplay 
        values={selectedValues}
        title="Selected Date & Time"
        className="mt-4"
      />
    </div>
  );
};

export default DateTimeFields;
