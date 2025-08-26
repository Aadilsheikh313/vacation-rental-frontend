import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import propertyReducer from './reducer/propertyReducer';
import reviewReducer from './reducer/reviewReducer';
import bookingReducer from "./reducer/bookingReducer";
import paymentReducer from './reducer/paymentReducer';
import invoiceReducer from './reducer/invoiceReducer';
import globalSearchReducer from './reducer/globalSearchReducer';
import adminAuthReducer from './reducer/adminAuthReducer';
import adminHomeDashReducer from './reducer/adminHomeDashReducer';
import adminDashboardReducer from './reducer/adminDashboardReducer';
import adminHostReducer from './reducer/adminHostReducer';
import adminGuestReducer from './reducer/adminGuestReducer';
import adminBannedUserReducer from './reducer/adminBannedUserReducer';
import adminBannedPropertyReducer from './reducer/adminActivePropertyReducer';
import adminPostReducer from './reducer/adminPostReducer';
import amenityReducer from "./reducer/amenityReducer";



const store = configureStore({
  reducer: {
    auth: authReducer,
    post: propertyReducer,
    review: reviewReducer,
    booking: bookingReducer,
    payment: paymentReducer,
    invoice: invoiceReducer,
    globalSearch: globalSearchReducer,
    adminAuth: adminAuthReducer,
    adminHomeDash: adminHomeDashReducer,
    adminDashboard: adminDashboardReducer,
    adminHost: adminHostReducer,
    adminGuest: adminGuestReducer,
    adminBannedUser: adminBannedUserReducer,
    adminBannedProperty: adminBannedPropertyReducer,
    adminPost: adminPostReducer,
     amenity: amenityReducer,
  },
});

export default store;
