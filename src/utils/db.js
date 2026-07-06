// ZENCE Central Cloud Database Utility
// Uses a free, zero-config key-value store (kvdb.io) for cross-device synchronization,
// with robust local localStorage fallbacks to handle offline states or sandboxed environments.

const BUCKET_ID = "ZenceServicesProdBucket_6b88";
const BASE_URL = `https://kvdb.io/${BUCKET_ID}`;

// Helper to make fetch requests with timeout fallback
async function fetchWithTimeout(url, options = {}, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export const db = {
  // 1. Get Admin Password
  async getPassword() {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/admin_password`);
      if (res.status === 404) {
        // No password set yet in cloud
        return null;
      }
      if (res.ok) {
        const password = await res.text();
        if (password) {
          localStorage.setItem('zence_admin_password', password);
          return password;
        }
      }
    } catch (err) {
      console.warn("Cloud DB getPassword failed, using local storage:", err);
    }
    // Fallback to local storage
    return localStorage.getItem('zence_admin_password');
  },

  // 2. Set Admin Password
  async setPassword(password) {
    // Save to local storage first
    localStorage.setItem('zence_admin_password', password);
    try {
      await fetchWithTimeout(`${BASE_URL}/admin_password`, {
        method: 'POST',
        body: password
      });
      return true;
    } catch (err) {
      console.warn("Cloud DB setPassword failed, saved locally only:", err);
      return false;
    }
  },

  // 3. Get Inquiries
  async getInquiries() {
    try {
      const res = await fetchWithTimeout(`${BASE_URL}/inquiries`);
      if (res.ok) {
        const text = await res.text();
        if (text) {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed)) {
            localStorage.setItem('zence_inquiries', JSON.stringify(parsed));
            return parsed;
          }
        }
      }
    } catch (err) {
      console.warn("Cloud DB getInquiries failed, using local storage:", err);
    }
    // Fallback to local storage
    const local = localStorage.getItem('zence_inquiries');
    if (local) {
      try { return JSON.parse(local); } catch (e) {}
    }
    return [];
  },

  // 4. Save Inquiries List (Bulk update/sync)
  async saveInquiries(inquiries) {
    // Save locally first
    localStorage.setItem('zence_inquiries', JSON.stringify(inquiries));
    try {
      await fetchWithTimeout(`${BASE_URL}/inquiries`, {
        method: 'POST',
        body: JSON.stringify(inquiries),
        headers: { 'Content-Type': 'application/json' }
      });
      return true;
    } catch (err) {
      console.warn("Cloud DB saveInquiries failed, saved locally only:", err);
      return false;
    }
  },

  // 5. Append Single Inquiry (Used on submission)
  async addInquiry(inquiry) {
    // Load existing
    const inquiries = await this.getInquiries();
    inquiries.unshift(inquiry);
    // Save list
    return await this.saveInquiries(inquiries);
  }
};
