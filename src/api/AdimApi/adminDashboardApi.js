import { clientServer } from "../../config/axios";


export const getAllAdminBookingApi = async() =>{
    try {
        const response = await clientServer.get("/api/v1/admin/bookings");
        return response.data;
    } catch (error) {
         console.error("❌ Get All Admin Active Property API Error:", error.response?.data || error.message);
        throw error;
    }
}
export const getAllAdminActiveBookingApi = async() =>{
    try {
        const response = await clientServer.get("/api/v1/admin/activebookings");
        return response.data;
    } catch (error) {
         console.error("❌ Get All Admin Active Property API Error:", error.response?.data || error.message);
        throw error;
    }
}