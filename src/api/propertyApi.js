
import { clientServer } from "../config/axios"



export const getAllPropertyPostedApi = async () => {
  const response = await clientServer.get("/api/property/getAllPropertyPosted");
  return response.data;
}

export const postPropertyApi = async (formData) => {
  const authData = JSON.parse(localStorage.getItem("auth"));
  const token = authData?.token;

  const response = await clientServer.post("/api/property/postProperty", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,  // ✅ send token here
    },
  });
 console.log("API", response.data);
 
  return response.data;
};



export const getSinglePropertyApi = async (id) => {
  const response = await clientServer.get(`/api/property/${id}`);
  return response.data;
}


export const editPropertyApi = async (id, updatedData, token) => {
  try {
    const formData = new FormData();

    formData.append("title", updatedData.title || "");
    formData.append("description", updatedData.description || "");
    formData.append("price", updatedData.price || "");
    formData.append("category", updatedData.category || "");
    formData.append("country", updatedData.country || "");
    formData.append("city", updatedData.city || "");
    formData.append("location", updatedData.location || "");
    formData.append("expired", updatedData.expired ? "true" : "false");

    if (updatedData.image) {
      formData.append("image", updatedData.image);
    }

    const response = await clientServer.put(`/api/property/edit/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Edit Property API Error:", error.response?.data || error.message);
    throw error; // 🔁 Let thunk handle it
  }
};

export const softdeletedPropertyApi = async (id, token) => {
  const response = await clientServer.delete(`/api/property/soft-delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },

  });
  return response.data;
};

export const harddeletedPropertyApi = async (id, token) => {
  const response = await clientServer.delete(`/api/property/hard-delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },

  });
  return response.data;
};

export const reactivePropertyApi = async (id, token) => {
  const response = await clientServer.put(`/api/property/reactivate/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}
export const getMyPropertiesApi = async () => {
  const response = await clientServer.get("/api/property/my-properties");
  return response.data;
}

export const getMyExpiredPropertyApi = async(token) =>{
  const response = await clientServer.get('/api/property/expired/my',{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  return response.data;
}

export const getPropertyByCategoryApi = async (token, category, filters = {}) => {
  const query = new URLSearchParams(filters).toString(); // 🔁 Convert filters to query string
  const response = await clientServer.get(`/api/property/category/${category}?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
