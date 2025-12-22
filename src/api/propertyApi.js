
import { clientServer } from "../config/axios"



export const getAllPropertyPostedApi = async () => {
  const response = await clientServer.get("/api/property/getAllPropertyPosted");
  return response.data;
}

export const postPropertyApi = async (formData) => {
  const authData = JSON.parse(localStorage.getItem("auth"));
  const token = authData?.token;

  try {
    const response = await clientServer.post("/api/property/postProperty", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("Post Property API Error:", err.response?.data);
    throw err;
  }

};



export const getSinglePropertyApi = async (id) => {
  const response = await clientServer.get(`/api/property/${id}`);
  return response.data;
}


export const editPropertyApi = async (id, formData, token) => {
  try {
    const response = await clientServer.put(
      `/api/property/edit/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ Edit Property API Error:", error.response?.data || error.message);
    throw error;
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

export const getMyExpiredPropertyApi = async (token) => {
  const response = await clientServer.get('/api/property/expired/my', {
    headers: {
      Authorization: `Bearer ${token}`
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


export const getPropertyByNearApi = async (latitude, longitude, distance = 20000) => {
  try {
    const response = await clientServer.get(`/api/property/nearby`, {
      params: { latitude, longitude, distance },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching nearby properties:", error.response?.data || error.message);
    throw error; // aage component me bhi catch ho sake
  }
};
