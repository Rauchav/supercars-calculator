/**
 * Service to handle Google Sheets integration via Apps Script
 */

const GOOGLE_APPS_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || "";

/**
 * Sends participant data to Google Sheets
 * @param {Object} participantData - The participant form data
 * @returns {Promise<Object>} - Response from the API
 */
export const sendParticipantToGoogleSheets = async (participantData) => {
  try {
    console.log("Google Apps Script URL:", GOOGLE_APPS_SCRIPT_URL);
    if (!GOOGLE_APPS_SCRIPT_URL) {
      throw new Error("Google Apps Script URL not configured");
    }

    // Create URL parameters for GET request (like your working script)
    const params = new URLSearchParams();
    params.append("firstName", participantData.firstName || "");
    params.append("lastName", participantData.lastName || "");
    params.append("phone", participantData.phone || "");
    params.append("email", participantData.email || "");
    params.append("region", participantData.region || "");

    const url = `${GOOGLE_APPS_SCRIPT_URL}?${params.toString()}`;
    console.log("Sending GET request to:", url);

    // Use no-cors mode directly (like your working script)
    await fetch(url, {
      method: "GET",
      mode: "no-cors",
    });

    console.log("Data sent to Google Sheets successfully");
    return { success: true, message: "Data sent successfully" };
  } catch (error) {
    console.error("Error sending data to Google Sheets:", error);
    throw error;
  }
};

/**
 * Formats participant data for Google Sheets
 * @param {Object} formData - Raw form data
 * @returns {Object} - Formatted data for Google Sheets
 */
export const formatParticipantData = (formData) => {
  return {
    timestamp: new Date().toISOString(),
    firstName: formData.name || "",
    lastName: formData.lastName || "",
    phone: formData.phone || "",
    email: formData.email || "",
    region: formData.region || "",
  };
};
