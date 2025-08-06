import { clientServer } from "../../config/axios";


export const PostAdminExperinceApi = async (formData) => {
    try {
       const adminauthData = JSON.parse(localStorage.getItem("admin"));
       console.log("AUTH TOKEN", adminauthData);
       
    //    const token = adminauthData?.token;
       const token = localStorage.getItem("token");
      console.log("TOKEN", token);
      
       if (!token) throw new Error("Unauthorized: No admin token found");

       const response  = await clientServer.post("/api/adminpost/admin/postExperience", formData,{
        headers:{
            "Content-Type" : "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
       })
       return response.data;
    } catch (error) {
        console.error("❌ Admin Post Experience Error:", error.response?.data || error.message);
        throw error;
    }
}