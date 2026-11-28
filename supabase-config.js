// Supabase configuration

const SUPABASE_URL = "https://bhorswdcqproyhbnfwit.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_XnggZ1y9OnlFTMmbvXdVVw_7ZSI-HId";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
