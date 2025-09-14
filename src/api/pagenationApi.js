import { clientServer } from "../config/axios";


export const PaginationApi = async (page = 1, limit = 1) => {
  try {
    const response = await clientServer.get(`/api/page/pagination?page=${page}&limit=${limit}`);
    console.log("API CALL URL:", `/api/page/pagination?page=${page}&limit=${limit}`);
    return response;
  } catch (error) {
    console.error("❌ Pagination Property API Error:", error.response?.data || error.message);
    throw error;
  }
};
