import { clientServer } from "../../config/axios";

export const getTotalGuestRegisterApi = async () =>{
    try {
        const response = await clientServer.get("/api/v1/admin/total-guests");
        return response.data;
    } catch (error) {
         console.error("❌ Get Total Guest API Error:", error.response?.data || error.message);
        throw error;
    }
}

export const getAllGuestRegisterApi = async () =>{
    try {
        const response = await clientServer.get("/api/v1/admin/all-guests");
        return response.data;
    } catch (error) {
         console.error("❌ Get All Guest API Error:", error.response?.data || error.message);
        throw error;
    }
}
