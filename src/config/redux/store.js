import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import propertyReducer from './reducer/propertyReducer';
import reviewReducer from './reducer/reviewReducer';
import bookingReducer from "./reducer/bookingReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: propertyReducer,
    review: reviewReducer,
    booking: bookingReducer,
  },
});

export default store;
