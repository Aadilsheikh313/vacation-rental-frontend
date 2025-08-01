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

export const getAdminAllCancelBookingApi = async() =>{
    try {
        const response = await clientServer.get("/api/v1/admin/cancelbookings");
        return response.data;
    } catch (error) {
       console.error("❌ Get All Admin Cancele Property API Error:", error.response?.data || error.message);
        throw error; 
    }
}

export const getAdminAllUpcomingBookingApi = async() =>{
    try {
        const response = await clientServer.get("/api/v1/admin/upcomingbookings");
        return response.data;
    } catch (error) {
       console.error("❌ Get All Admin Upcoming booking Property API Error:", error.response?.data || error.message);
        throw error; 
    }
}

export const getAdminAllPastBookingApi = async() =>{
     try {
        const response = await clientServer.get("/api/v1/admin/pastbookings");
        return response.data;
    } catch (error) {
       console.error("❌ Get All Admin Past booking Property API Error:", error.response?.data || error.message);
        throw error; 
    }
}
export const getTotalAmountgApi = async() =>{
     try {
        const response = await clientServer.get("/api/v1/admin/total-amount");
        return response.data;
    } catch (error) {
       console.error("❌ Get Total amount Property API Error:", error.response?.data || error.message);
        throw error; 
    }
}
export const getTotalBookingApi = async() =>{
     try {
        const response = await clientServer.get("/api/v1/admin/total-bookings");
        return response.data;
    } catch (error) {
       console.error("❌ Get Total booking Property API Error:", error.response?.data || error.message);
        throw error; 
    }
}