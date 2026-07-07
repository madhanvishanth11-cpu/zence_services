// ZENCE Supabase Cloud Database Client
// Communicates with Supabase using native REST API for maximum performance and 0 bundle overhead.

const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 
  "https://eojoktnzhmqprkpqjcgh.supabase.co";

const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  "";

export const supabase = {
  isEnabled() {
    return !!(SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY");
  },

  async addInquiry(inquiry) {
    if (!this.isEnabled()) {
      console.warn("Supabase credentials not configured in the .env file.");
      return null;
    }
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/inquiries`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(inquiry)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Supabase insert failed: ${errorText}`);
      }
      return await response.json();
    } catch (err) {
      console.error("Supabase REST API error:", err);
      throw err;
    }
  }
};
