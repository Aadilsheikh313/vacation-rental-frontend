import { clientServer } from "../../config/axios";

export const getAllPropertyAdminApi = async () => {
    try {
        const response = await clientServer.get("/api/v1/admin/all-properties");

        return response.data;
    } catch (error) {
        console.error("❌ Get All Admin Property API Error:", error.response?.data || error.message);
        throw error;
    }
}

export const getSinglePropertyAdminApi = async (propertyId) => {
    try {
        const response = await clientServer.get(`/api/v1/admin/property/${propertyId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Get Single Admin Property API Error:", error.response?.data || error.message);
        throw error;
    }
}