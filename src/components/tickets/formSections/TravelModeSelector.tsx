
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Bus, Car, RailSymbol } from "lucide-react";
import { cn } from "@/lib/utils";

interface TravelModeSelectorProps {
  mode: "rail" | "bus" | "car";
  onModeChange: (mode: "rail" | "bus" | "car") => void;
}

const TravelModeSelector: React.FC<TravelModeSelectorProps> = ({ mode, onModeChange }) => {
  return (
    <div>
      <Label className="text-lg mb-2 font-medium">Mode of Travel</Label>
      <div className="flex flex-wrap gap-4 mt-3">
        <RadioGroup
          value={mode}
          onValueChange={(value: "rail" | "bus" | "car") => onModeChange(value)}
          className="flex flex-wrap gap-4 w-full"
        >
          <div className="flex-1 min-w-[120px]">
            <Label
              htmlFor="rail"
              className={cn(
                "border rounded-lg p-4 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 w-full",
                mode === "rail" ? "border-primary bg-primary/10" : "hover:bg-accent"
              )}
              aria-label="Select Rail travel mode"
            >
              <RailSymbol className={cn("h-8 w-8", mode === "rail" ? "text-primary" : "text-muted-foreground")} />
              <div className="flex items-center gap-2">
                <RadioGroupItem value="rail" id="rail" />
                <span className="font-medium">Rail</span>
              </div>
            </Label>
          </div>
          <div className="flex-1 min-w-[120px]">
            <Label
              htmlFor="bus"
              className={cn(
                "border rounded-lg p-4 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 w-full",
                mode === "bus" ? "border-primary bg-primary/10" : "hover:bg-accent"
              )}
              aria-label="Select Bus travel mode"
            >
              <Bus className={cn("h-8 w-8", mode === "bus" ? "text-primary" : "text-muted-foreground")} />
              <div className="flex items-center gap-2">
                <RadioGroupItem value="bus" id="bus" />
                <span className="font-medium">Bus</span>
              </div>
            </Label>
          </div>
          <div className="flex-1 min-w-[120px]">
            <Label
              htmlFor="car"
              className={cn(
                "border rounded-lg p-4 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 w-full",
                mode === "car" ? "border-primary bg-primary/10" : "hover:bg-accent"
              )}
              aria-label="Select Car Pool travel mode"
            >
              <Car className={cn("h-8 w-8", mode === "car" ? "text-primary" : "text-muted-foreground")} />
              <div className="flex items-center gap-2">
                <RadioGroupItem value="car" id="car" />
                <span className="font-medium">Car Pool</span>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default TravelModeSelector;
