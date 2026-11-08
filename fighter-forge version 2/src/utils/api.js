/**
 * Backend API Client for Fighter Forge
 * Communicates with FastAPI / Node server with automatic localStorage fallback
 */

const API_BASE = window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1")
  ? window.location.origin
  : "";

/**
 * Save standard enquiry (cart checkout) to MongoDB / backend
 */
export async function saveCartEnquiry(enquiryData) {
  try {
    const response = await fetch(`${API_BASE}/api/enquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...enquiryData,
        createdAt: new Date().toISOString()
      })
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    }
  } catch (error) {
    console.warn("Backend API not reachable. Saving to local backup:", error);
  }

  // Fallback: persist in localStorage backup
  try {
    const existing = JSON.parse(localStorage.getItem("fighter_forge_enquiries_backup") || "[]");
    existing.push({
      ...enquiryData,
      id: "local_" + Date.now(),
      createdAt: new Date().toISOString()
    });
    localStorage.setItem("fighter_forge_enquiries_backup", JSON.stringify(existing));
  } catch (e) {
    console.error("Local backup storage error:", e);
  }

  return { success: true, isLocalBackup: true };
}

/**
 * Upload reference photos and submit custom arena build enquiry
 */
export async function submitCustomEnquiry(formData) {
  try {
    const response = await fetch(`${API_BASE}/api/custom-enquiry`, {
      method: "POST",
      body: formData // multipart/form-data
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data, uploadedUrls: data.uploadedUrls || [] };
    }
  } catch (error) {
    console.warn("Custom enquiry API not reachable, proceeding with local fallback:", error);
  }

  // If offline, extract photo names for display in WhatsApp message
  const uploadedUrls = [];
  return {
    success: true,
    isLocalBackup: true,
    uploadedUrls
  };
}

/**
 * Submit gear idea to backend
 */
export async function submitGearIdea(ideaData) {
  try {
    const response = await fetch(`${API_BASE}/api/gear-ideas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...ideaData,
        createdAt: new Date().toISOString()
      })
    });

    if (response.ok) {
      return { success: true };
    }
  } catch (error) {
    console.warn("Could not reach backend for gear ideas:", error);
  }
  return { success: true, isLocalBackup: true };
}

/**
 * Save event rental enquiry to MongoDB / backend
 */
export async function saveRentalEnquiry(rentalData) {
  try {
    const response = await fetch(`${API_BASE}/api/rentals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...rentalData,
        createdAt: new Date().toISOString()
      })
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    }
  } catch (error) {
    console.warn("Backend API not reachable. Saving rental enquiry to local backup:", error);
  }

  // Fallback: persist in localStorage backup
  try {
    const existing = JSON.parse(localStorage.getItem("fighter_forge_rentals_backup") || "[]");
    existing.push({
      ...rentalData,
      id: "rental_local_" + Date.now(),
      createdAt: new Date().toISOString()
    });
    localStorage.setItem("fighter_forge_rentals_backup", JSON.stringify(existing));
  } catch (e) {
    console.error("Local rental backup storage error:", e);
  }

  return { success: true, isLocalBackup: true };
}
