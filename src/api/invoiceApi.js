import { clientServer } from "../config/axios";



//Get invoice of booking property
export const getDownloadInvoiceApi = async (bookingId, token) => {
  try {
    const response = await clientServer.get(`/api/invoice/download/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob", // 👈 VERY IMPORTANT for downloading PDF
    });
// ✅ Validate it's actually a PDF
    const contentType = response.headers["content-type"];
    if (contentType !== "application/pdf") {
      throw new Error("Invalid response type. Expected PDF but got " + contentType);
    }
    // Create a Blob and trigger download
    const blob = new Blob([response.data], { type: "application/pdf" });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `Invoice-${bookingId}.pdf`;
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(downloadUrl);
    link.remove();

    return { success: true };
  } catch (error) {
    console.error("❌ Invoice download API error:", error.response?.data || error.message);
    throw error;
  }
};

// Get invoice details
export const viewInvoiceApi = async (bookingId, token) => {
  try {
    const response =  await clientServer.get(`/api/invoice/view/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Invoice view API error:", error.response?.data || error.message);
    throw error;
  }
};
