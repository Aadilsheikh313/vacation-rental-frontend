import { clientServer } from "../../config/axios";


export const getApprovedPostAdminApi = async () => {
    try {
        const response = await clientServer.get("/api/adminpost/user-getallPosts");
        return response.data;
    } catch (error) {
        console.error("❌ Get All Approved  Post Admin by User Error:", error.response?.data || error.message);
        throw error;
    }
}

export const getAllPostAdminApi = async () => {
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

export const getSinglePostAdminApi = async(PostId) =>{
    try {
        const response = await clientServer.get(`/api/adminpost/admin/${PostId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Admin Field a Single Post Error:", error.response?.data || error.message);
        throw error;
    }
}

export const admineditPostApi = async (id, updatedData, token) => {
  try {
    const formData = new FormData();

    // ✅ Append only the fields that exist in your Experience model
    formData.append("title", updatedData.title || "");
    formData.append("description", updatedData.description || "");
    formData.append("category", updatedData.category || "");
    formData.append("subcategory", updatedData.subcategory || "");
    formData.append("country", updatedData.country || "");
    formData.append("city", updatedData.city || "");
    formData.append("location", updatedData.location || "");
    formData.append("bestTimeToVisit", updatedData.bestTimeToVisit || "");
    formData.append("history", updatedData.history || "");
    
    // Tips array ko handle karo (agar user ne diya hai)
    if (Array.isArray(updatedData.tips)) {
      updatedData.tips.forEach((tip, index) => {
        formData.append(`tips[${index}]`, tip);
      });
    }

    // Approval status
    if (updatedData.isApproved !== undefined) {
      formData.append("isApproved", updatedData.isApproved ? "true" : "false");
    }

    // ✅ Add image if provided
    if (updatedData.image) {
      formData.append("image", updatedData.image);
    }

    const response = await clientServer.put(
      `/api/adminpost/admin/adminedit/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ Admin Edit Post API Error:", error.response?.data || error.message);
    throw error; // Let thunk handle the error
  }
};
