import { clientServer } from "../config/axios";


export const getAllReviewApi = async (propertyId) => {
  const response = await clientServer.get(`/api/review/property/${propertyId}`);
  return response.data;
}


export const postReviewApi = async ({ propertyId, token, rating, comment }) => {
  try {
    const response = await clientServer.post(
      `/api/review/property/${propertyId}`,
      { rating, comment },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Review API error", error.response?.data || error.message);
    throw error;
  }
};

export const editReviewApi = async ({ propertyId, reviewId, token, rating, comment }) => {
  try {
    const response = await clientServer.put(
      `/api/review/property/${propertyId}/review/${reviewId}`,
      { rating, comment },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Edit Review API error", error.response?.data || error.message);
    throw error;
  }
};

export const deleteReviewApi = async ({ propertyId, reviewId, token }) => {
  try {
    const response = await clientServer.delete(
      `/api/review/property/${propertyId}/review/${reviewId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ); 
    return response.data;
  } catch (error) {
    console.error("❌ Delete Review API error", error.response?.data || error.message);
    throw error;
  }
};
