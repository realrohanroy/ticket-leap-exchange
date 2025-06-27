
-- Create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    key text NOT NULL UNIQUE,
    value text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Insert default disclaimer text
INSERT INTO public.site_settings (key, value) VALUES 
('disclaimer_text', 'ShareMySeat connects travelers but does not facilitate ticket transfers or guarantee ticket validity. Users are responsible for verifying all travel arrangements independently.');

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access to site_settings" ON public.site_settings
    FOR SELECT USING (true);

-- Create policy to allow authenticated users to update (for admin functionality)
CREATE POLICY "Allow authenticated users to update site_settings" ON public.site_settings
    FOR ALL USING (auth.role() = 'authenticated');
