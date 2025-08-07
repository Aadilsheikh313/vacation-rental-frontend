import { clientServer } from "../../config/axios";


export const getApprovedPostAdminApi = async() =>{
    try {
        const response = await clientServer.get("/api/adminpost/user-getallPosts");
        return response.data;
    } catch (error) {
        console.error("❌ Get All Approved  Post Admin by User Error:", error.response?.data || error.message);
        throw error;
    }
}

export const getAllPostAdminApi = async() =>{
    try {
        const response = await clientServer.get("/api/adminpost/admin-getAllPosts");
        return response.data;
    } catch (error) {
        console.error("❌ Get All  Post Admin  Error:", error.response?.data || error.message);
        throw error;
    }
}

export const PostAdminExperinceApi = async (formData) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized: No admin token found");

        const response = await clientServer.post("/api/adminpost/admin/postExperience", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
    } catch (error) {
        console.error("❌ Admin Post Experience Error:", error.response?.data || error.message);
        throw error;
    }
}