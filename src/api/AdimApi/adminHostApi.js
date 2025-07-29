import { clientServer } from "../../config/axios";

export const getTotalHostRegisterApi = async () =>{
    try {
        const response = await clientServer.get("/api/v1/admin/total-hosts");
        return response.data;
    } catch (error) {
         console.error("❌ Get Total Host API Error:", error.response?.data || error.message);
        throw error;
    }
}

export const getAllHostRegisterApi = async () =>{
    try {
        const response = await clientServer.get("/api/v1/admin/all-hosts");
        return response.data;
    } catch (error) {
         console.error("❌ Get All Host API Error:", error.response?.data || error.message);
        throw error;
    }
}