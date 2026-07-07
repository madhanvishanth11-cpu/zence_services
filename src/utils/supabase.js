// ZENCE Supabase Cloud Database Client
// Communicates with Supabase using native REST API for maximum performance and 0 bundle overhead.

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const getHeaders = () => ({
  "apikey": SUPABASE_ANON_KEY,
  "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
});

export const supabase = {
  isEnabled() {
    return !!(SUPABASE_URL && SUPABASE_ANON_KEY);
  },

  async getInquiries() {
    if (!this.isEnabled()) {
      console.warn("Supabase credentials not configured in .env file.");
      return [];
    }
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/inquiries?select=*&order=created_at.desc`, {
        method: "GET",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Failed to fetch inquiries");
      return await res.json();
    } catch (err) {
      console.error("Supabase getInquiries error:", err);
      throw err;
    }
  },

  async addInquiry(inquiry) {
    if (!this.isEnabled()) {
      console.warn("Supabase credentials not configured in .env file.");
      return null;
    }
    try {
      const payload = {
        full_name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        selected_service: inquiry.service,
        project_scope: inquiry.scope,
        status: inquiry.status || "New"
      };

      const res = await fetch(`${SUPABASE_URL}/rest/v1/inquiries`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to insert inquiry");
      const data = await res.json();
      return data[0];
    } catch (err) {
      console.error("Supabase addInquiry error:", err);
      throw err;
    }
  },

  async updateStatus(id, newStatus) {
    if (!this.isEnabled()) return null;
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/inquiries?id=eq.${id}`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error("Failed to update status");
      return true;
    } catch (err) {
      console.error("Supabase updateStatus error:", err);
      throw err;
    }
  },

  async deleteInquiry(id) {
    if (!this.isEnabled()) return null;
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/inquiries?id=eq.${id}`, {
        method: "DELETE",
        headers: getHeaders()
      });
      if (!res.ok) throw new Error("Failed to delete inquiry");
      return true;
    } catch (err) {
      console.error("Supabase deleteInquiry error:", err);
      throw err;
    }
  }
};
