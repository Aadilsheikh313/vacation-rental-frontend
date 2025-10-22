import { clientServer } from "../../config/axios";


// ✅ Get all pending hosts (Admin only)
export const GetAllHostPendingApi = async () => {
    try {
        const response = await clientServer.get("/api/host-verify/pending-hosts");
        return response.data;
    } catch (error) {
        console.error("❌ Get Pending Host API Error:", error.response?.data || error.message);

        // Handle token expiration or unauthorized access gracefully
        if (error.response?.status === 401 || error.response?.status === 403) {
            throw new Error("Unauthorized access! Please login as admin.");
        }

        // ✅ Return clean error message
        throw new Error(error.response?.data?.message || "Something went wrong while fetching pending hosts.");
    }
};

