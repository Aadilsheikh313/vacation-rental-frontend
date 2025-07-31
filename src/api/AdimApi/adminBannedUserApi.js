
import { clientServer } from "../../config/axios";

/**
 * ✅ Ban a user (Admin only)
 * @param {string} userId 
 * @param {string} reason - Optional ban reason
 */
export const adminBannedUserApi = async (userId, reason = "Violation of rules") => {
  try {
    const response = await clientServer.put(`/api/banned/admin/ban/${userId}`, { reason });
    return response.data;
  } catch (error) {
    console.error("❌ Ban User Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * ✅ Unban a user (Only same admin)
 * @param {string} userId 
 * @param {string} note - Optional unban note
 */
export const adminUnbanUserApi = async (userId, note = "Unbanned after review") => {
  try {
    const response = await clientServer.put(`/api/banned/admin/unban/${userId}`, { note });
    return response.data;
  } catch (error) {
    console.error("❌ Unban User Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * ✅ Fetch all ban/unban logs (Admin only)
 */
export const getBanLogsApi = async () => {
  try {
    const response = await clientServer.get(`/api/banned/admin/ban-logs`);
    return response.data.logs;
  } catch (error) {
    console.error("❌ Get Logs Error:", error.response?.data || error.message);
    throw error;
  }
};
