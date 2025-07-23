import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import propertyReducer from './reducer/propertyReducer';
import reviewReducer from './reducer/reviewReducer';
import bookingReducer from "./reducer/bookingReducer";
import paymentReducer from './reducer/paymentReducer';
import invoiceReducer from './reducer/invoiceReducer';
import adminAuthReducer from './reducer/adminAurhReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: propertyReducer,
    review: reviewReducer,
    booking: bookingReducer,
    payment: paymentReducer,
    invoice: invoiceReducer,
    adminAuth: adminAuthReducer,
  },
});

export default store;
