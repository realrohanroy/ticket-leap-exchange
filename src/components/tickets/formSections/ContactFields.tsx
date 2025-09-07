
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { countryCodes } from '@/lib/constants';

interface ContactFieldsProps {
  contactInfo: string;
  countryCode: string;
  additionalInfo?: string;
  onContactInfoChange: (value: string) => void;
  onCountryCodeChange: (value: string) => void;
  onAdditionalInfoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  formErrors: {[key: string]: boolean};
}

const ContactFields: React.FC<ContactFieldsProps> = ({
  contactInfo,
  countryCode,
  additionalInfo,
  onContactInfoChange,
  onCountryCodeChange,
  onAdditionalInfoChange,
  formErrors
}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contactInfo" className={cn(formErrors.contactInfo && "text-destructive")}>WhatsApp Number *</Label>
          <div className="flex items-center gap-2">
            <Select
              value={countryCode || "+91"}
              onValueChange={onCountryCodeChange}
            >
              <SelectTrigger className="w-[110px] flex-shrink-0">
                <SelectValue placeholder="+91" />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.code} {country.country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="contactInfo"
              name="contactInfo"
              placeholder="WhatsApp number without country code"
              required
              value={contactInfo || ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                onContactInfoChange(value);
              }}
              pattern="[0-9]{10}"
              minLength={10}
              maxLength={10}
              inputMode="tel"
              style={{ textSizeAdjust: "100%" }}
              className={cn(formErrors.contactInfo && "border-destructive")}
              aria-invalid={formErrors.contactInfo}
            />
          </div>
          {formErrors.contactInfo ? (
            <p className="text-xs text-destructive">WhatsApp number is required</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Please enter your WhatsApp number
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalInfo">
          Additional Information (Optional)
        </Label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          placeholder="Any other details about the ticket"
          rows={3}
          value={additionalInfo || ""}
          onChange={onAdditionalInfoChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
      </div>
    </>
  );
};

export default ContactFields;
