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


export const GetAllVerifiedHostApi = async () => {
    try {
        const response = await clientServer.get('/api/host-verify/verified-hosts');
        return response.data;
    } catch (error) {
        console.error("❌ Verified Host API Error:", error.response?.data || error.message);

        if (error.response?.status === 401 || error.response?.status === 403) {
            throw new Error("Unauthorized access! Please login as admin.");
        }

        throw new Error(error.response?.data?.message || "Something went wrong while fetching verified hosts.");
    }
};

export const GetAllRejectedHostApi = async () => {
    try {
        const response = await clientServer.get('/api/host-verify/rejected-hosts');
        return response.data;
    } catch (error) {
        console.error("❌ Rejected Host API Error:", error.response?.data || error.message);

        if (error.response?.status === 401 || error.response?.status === 403) {
            throw new Error("Unauthorized access! Please login as admin.");
        }

        throw new Error(error.response?.data?.message || "Something went wrong while fetching rejected hosts.");
    }
};


export const VerifyOrRejectHostApi = async (hostId, action, note) => {
    try {
        const response = await clientServer.put(
            `/api/host-verify/verify-reject-host/${hostId}`,
            { action, note }
        );

        return response.data;
    } catch (error) {
        console.error("❌ Verify/Reject Host API Error:", error.response?.data || error.message);

        // Handle unauthorized or forbidden access
        if (error.response?.status === 401 || error.response?.status === 403) {
            throw new Error("Unauthorized access! Please login as admin.");
        }

        throw new Error(error.response?.data?.message || "Something went wrong while verifying or rejecting host.");
    }
};

export const ReverificationApi = async (hostId, action, note) => {
    try {
        const response = await clientServer.put(`/api/host-verify/reverify-host/${hostId}`, { action, note });
        return response.data;

    } catch (error) {
        console.error("❌ ReVerify Host API Error:", error.response?.data || error.message);

        if (error.response?.status === 401 || error.response?.status === 403) {
            throw new Error("Unauthorized access! Please login as admin.");
        }

        throw new Error(error.response?.data?.message || "Something went wrong while reverifying host.");
    }
};
