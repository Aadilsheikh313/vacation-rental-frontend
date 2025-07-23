import { clientServer } from "../../config/axios";


export const adminRegisterApi = async(adminauthData)=>{
    try {
         const response = await clientServer.post("/api/v1/admin/register", adminauthData);
          return response.data;
    } catch (error) {
        console.error("❌ Error in AdminRegisterApi:", error?.response?.data || error.message);
    throw error;
    }
}

export const adminLoginApi = async(credentials)=>{
    try {
         const response = await clientServer.post("/api/v1/admin/login", credentials);
          return response.data;
    } catch (error) {
        console.error("❌ Error in AdminloginApi:", error?.response?.data || error.message);
    throw error;
    }
}