import { clientServer } from "../../config/axios";


export const getAllHostRegisterApi = async () =>{
    try {
        const response = await clientServer.get("/api/v1/admin/all-hosts");
        return response.data;
    } catch (error) {
         console.error("❌ Get All Host API Error:", error.response?.data || error.message);
        throw error;
    }
}

export const getAllActiveHostRegisterApi = async () =>{
    try {
        const response = await clientServer.get("/api/v1/admin/active-hosts");
        return response.data;
    } catch (error) {
         console.error("❌ Get All Active Host API Error:", error.response?.data || error.message);
        throw error;
    }
}

export const getAllOnlineHostRegisterApi = async () =>{
    try {
        const response = await clientServer.get("/api/v1/admin/online-hosts");
        return response.data;
    } catch (error) {
         console.error("❌ Get All Online Host API Error:", error.response?.data || error.message);
        throw error;
    }
}
export const getAllNewHostRegisterApi = async () =>{
    try {
        const response = await clientServer.get("/api/v1/admin/new-hosts");
        return response.data;
    } catch (error) {
         console.error("❌ Get All New Host API Error:", error.response?.data || error.message);
        throw error;
    }
}

export const getAllLogoutHostRegisterApi = async () =>{
    try {
        const response = await clientServer.get("/api/v1/admin/logout-hosts");
        return response.data;
    } catch (error) {
         console.error("❌ Get All New Host API Error:", error.response?.data || error.message);
        throw error;
    }
}

export const getAllBannedHostRegisterApi = async () =>{
    try {
        const response = await clientServer.get("/api/v1/admin/banned-hosts");
        return response.data;
    } catch (error) {
         console.error("❌ Get All New Host API Error:", error.response?.data || error.message);
        throw error;
    }
}