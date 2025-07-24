import { clientServer } from "../../config/axios";

export const getAllPropertyAdminApi = async() =>{
    try {
        const response = await clientServer.get("/api/v1/admin/all-properties");
        console.log("API ADMIN", response);
        
        return response.data;
         console.log("API ADMINdd", response.data);
    } catch (error) {
        console.error("❌ Get All Admin Property API Error:", error.response?.data || error.message);
    throw error;
    }
}