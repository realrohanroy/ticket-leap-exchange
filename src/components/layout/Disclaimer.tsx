
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useSiteSettings } from '@/context/SiteSettingsContext';

type DisclaimerProps = {
  className?: string;
};

const Disclaimer = ({ className }: DisclaimerProps) => {
  const { settings } = useSiteSettings();
  
  return (
    <Alert variant="warning" className={className}>
      <AlertCircle className="h-4 w-4 mr-2" />
      <AlertDescription>
        {settings.disclaimer_text}
      </AlertDescription>
    </Alert>
  );
};

export default Disclaimer;
