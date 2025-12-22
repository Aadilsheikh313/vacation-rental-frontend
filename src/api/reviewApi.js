import { clientServer } from "../config/axios";

// Get all reviews
export const getAllReviewApi = async (propertyId) => {
  const response = await clientServer.get(`/api/review/property/${propertyId}`);
  return response.data;
};

// Post review
export const postReviewApi = async ({
  propertyId,
  token,
  rating,
  comment,
  cleanliness,
  comfort,
  service,
  location,
}) => {
  const response = await clientServer.post(
    `/api/review/property/${propertyId}`,
    { rating, comment, cleanliness, comfort, service, location },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Edit review
export const editReviewApi = async ({
  reviewId,
  token,
  rating,
  comment,
  cleanliness,
  comfort,
  service,
  location,
}) => {
  const response = await clientServer.put(
    `/api/review/review/${reviewId}`,
    { rating, comment, cleanliness, comfort, service, location },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};



// Host Replay review
export const hostReplyToReviewApi = async ({
  reviewId,
  token,
  message,
}) => {
  const response = await clientServer.post(
    `/api/review/review/${reviewId}/reply`,
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getReviewAnalyticsApi = async ({
  propertyId,
  token,
}) => {
  const response = await clientServer.get(
    `/api/review/property/${propertyId}/analytics`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};


export const getAdminReviewAnalyticsApi = async ({
  propertyId,
  token,
}) => {
  const response = await clientServer.get(
    `/api/review/admin/property/${propertyId}/analytics`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const toggleReviewVisibilityApi = async ({
  reviewId,
  token,
  isHidden,
  reason,
}) => {
  const response = await clientServer.patch(
    `/api/review/review/${reviewId}/visibility`,
    { isHidden, reason },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

