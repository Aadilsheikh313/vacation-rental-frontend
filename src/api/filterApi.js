import { clientServer } from "../config/axios";


export const PricesBaseFilterApi = async (sortValue) => {
    try {
       const response = await clientServer.get(`/api/filter/priceFilter?sort=${sortValue}`);
       return response.data;
    } catch (error) {
        console.error("❌ Price filtering Property API Error:", error.response?.data || error.message);
        throw error;
    }
}
