import { clientServer } from "../config/axios";

// Price Sorting Filter API (GET)
export const PricesBaseFilterApi = async (sortValue) => {
    try {
        const response = await clientServer.get(`/api/filter/priceFilter?sort=${sortValue}`);
        return response.data;
    } catch (error) {
        console.error("❌ Price filtering Property API Error:", error.response?.data || error.message);
        throw error;
    }
}

//  Rooms Advanced Filter API (POST)
export const FilterRoomsApi = async (filters) => {
    try {
        const response = await clientServer.post(`/api/filter/roomFilter`, filters);
        return response.data;
    } catch (error) {
        console.error("❌ Room filtering Property API Error:", error.response?.data || error.message);
        throw error;
    }
};