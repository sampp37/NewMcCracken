import { createClient } from '@supabase/supabase-js';

const url = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://tltiysrigsdwqfqygqms.supabase.co';
const key = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsdGl5c3JpZ3Nkd3FmcXlncW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NjQ0NzYsImV4cCI6MjA4OTU0MDQ3Nn0.DxDU8VDH5fnRsb8chTJsfZAow_q6BU1Be4tC5JZ02s7E';

export const supabase = createClient(url, key);
