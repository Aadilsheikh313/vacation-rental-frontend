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


export const getAllActiveGuestApi = async () =>{
    try {
        const response = await clientServer.get("/api/v1/admin/guests/active-week");
        return response.data;
    } catch (error) {
         console.error("❌ Get All Active Guest API Error:", error.response?.data || error.message);
        throw error;
    }
}

export const getAllDailyActiveGuestApi = async () =>{
    try {
        const response = await clientServer.get("/api/v1/admin/guests/active-today");
        return response.data;
    } catch (error) {
         console.error("❌ Get Daily Active Guest API Error:", error.response?.data || error.message);
        throw error;
    }
}

export const getAllOnlineGuestApi = async () =>{
    try {
        const response = await clientServer.get("/api/v1/admin/guests/online");
        return response.data;
    } catch (error) {
         console.error("❌ Get Online Guest API Error:", error.response?.data || error.message);
        throw error;
    }
}

export const getAllLogoutGuestApi = async () =>{
    try {
        const response = await clientServer.get("/api/v1/admin/guests/logout");
        return response.data;
    } catch (error) {
         console.error("❌ Get Logout Guest API Error:", error.response?.data || error.message);
        throw error;
    }
}

export const getAllNewRegisterGuestApi = async () =>{
    try {
        const response = await clientServer.get("/api/v1/admin/guests/new-today");
        return response.data;
    } catch (error) {
         console.error("❌ Get New Register Guest API Error:", error.response?.data || error.message);
        throw error;
    }
}

export const getAllBannedGuestApi = async () =>{
    try {
        const response = await clientServer.get("/api/v1/admin/guests/banned");
        return response.data;
    } catch (error) {
         console.error("❌ Get Banned Guest API Error:", error.response?.data || error.message);
        throw error;
    }
}