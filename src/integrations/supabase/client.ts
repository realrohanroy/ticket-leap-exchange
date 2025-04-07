
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../types/database.types';

const SUPABASE_URL = "https://bleshhobnminvsghtqzn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsZXNoaG9ibm1pbnZzZ2h0cXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMzc5NzIsImV4cCI6MjA1OTYxMzk3Mn0.fcDhJx11AsooHdV9CMqMopKfx5WSLpCqgYaAiERhllM";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
