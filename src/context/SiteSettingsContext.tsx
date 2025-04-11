
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

type SiteSettings = {
  disclaimer_text: string;
  [key: string]: string;
};

type SiteSettingsContextType = {
  settings: SiteSettings;
  isLoading: boolean;
  error: string | null;
  refreshSettings: () => Promise<void>;
};

const defaultSettings: SiteSettings = {
  disclaimer_text: 'We do not facilitate ticket transfers or guarantee validity of tickets.',
};

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: defaultSettings,
  isLoading: true,
  error: null,
  refreshSettings: async () => {},
});

export const useSiteSettings = () => useContext(SiteSettingsContext);

export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');
      
      if (error) throw error;
      
      const settingsObj: SiteSettings = { ...defaultSettings };
      
      if (data) {
        data.forEach(item => {
          settingsObj[item.key] = item.value || '';
        });
      }
      
      setSettings(settingsObj);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching site settings:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider 
      value={{ 
        settings, 
        isLoading, 
        error, 
        refreshSettings: fetchSettings 
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};
