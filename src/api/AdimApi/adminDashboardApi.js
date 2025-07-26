import { clientServer } from "../../config/axios";


export const getAllActiveBookingApi = async() =>{
    try {
        const response = await clientServer.get("/api/v1/admin/bookings");
        return response.data;
    } catch (error) {
         console.error("❌ Get All Admin Active Property API Error:", error.response?.data || error.message);
        throw error;
    }
}