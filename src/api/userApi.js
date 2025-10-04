import { clientServer } from "../config/axios";


export const userProfileApi = async (tokenObj) => {
    try {
        if (!tokenObj?.token) {
            console.error("❌ No token provided to userProfileApi");
            return null;
        }
        const response = await clientServer.get("/api/userProfile/profile", {
            headers: {
                Authorization: `Bearer ${tokenObj.token}`,
            }
        }
        )
        return response.data.user;
    } catch (error) {
        console.error("❌ Error in userProfileApi:", {
            status: error.response?.status,
            message: error.response?.data?.message || error.message,
            stack: error.stack,
        });
        return null;
    }
}

export const updateUserProfileApi = async (tokenObj, formData) => {
    try {
        const response = await clientServer.put('/api/userProfile/profile/update', formData, {
            headers: {
                'Content-Type' : 'multipart/form-data',
                Authorization: `Bearer ${tokenObj.token}`,
            }
        })
        return response.data.user;
    } catch (error) {
        console.error("❌ Error in updateUserProfileApi:", {
            status: error.response?.status,
            message: error.response?.data?.message || error.message,
            stack: error.stack,
        });
        return null;
    }
}