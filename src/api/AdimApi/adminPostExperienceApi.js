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

export const getSinglePostAdminApi = async (PostId) => {
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

    const fields = [
      "title", "description", "category", "subcategory",
      "country", "city", "location", "bestTimeToVisit", "history"
    ];

    fields.forEach(field => {
      if (updatedData[field]) {
        formData.append(field, updatedData[field]);
      }
    });

    if (Array.isArray(updatedData.tips) && updatedData.tips.length) {
      formData.append("tips", JSON.stringify(updatedData.tips));
    }

    if (updatedData.isApproved !== undefined) {
      formData.append("isApproved", updatedData.isApproved ? "true" : "false");
    }

    if (updatedData.image instanceof File) {
      formData.append("image", updatedData.image);
    }
    const response = await clientServer.put(

      `/api/adminpost/admin/adminedit/${id}`,


      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // add this header explicitly
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Admin Edit Post API Error:", error.response?.data || error.message);
    throw error;
  }
};


  export const reApprovedPostAdminApi = async(id, token) =>{
    try {
      const response = await clientServer.put(`/api/adminpost/admin/approved/${id}`, {}, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      return response.data;
    } catch (error) {
      console.error("❌ Admin ReApproved Post API Error:", error.response?.data || error.message);
      throw error;
    }
  }