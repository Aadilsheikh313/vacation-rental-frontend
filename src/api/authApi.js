
import { clientServer } from "../config/axios"

export const registerApi = async (userAuthData) => {
  const response = await clientServer.post("/api/auth/register", userAuthData);
  return response.data;
}

export const loginApi = async (credentials) => {
  try {
    const response = await clientServer.post("/api/auth/login", credentials);
    return response.data;

  } catch (error) {
    console.error("❌ Error in loginApi:", error?.response?.data || error.message);
    throw error;
  }
};




