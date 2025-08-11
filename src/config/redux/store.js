import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import propertyReducer from './reducer/propertyReducer';
import reviewReducer from './reducer/reviewReducer';
import bookingReducer from "./reducer/bookingReducer";
import paymentReducer from './reducer/paymentReducer';
import invoiceReducer from './reducer/invoiceReducer';
import adminAuthReducer from './reducer/adminAuthReducer';
import adminHomeDashReducer from './reducer/adminHomeDashReducer';
import adminDashboardReducer from './reducer/adminDashboardReducer';
import adminHostReducer from './reducer/adminHostReducer';
import adminGuestReducer from './reducer/adminGuestReducer';
import adminBannedUserReducer from './reducer/adminBannedUserReducer';
import adminBannedPropertyReducer from './reducer/adminActivePropertyReducer';
import adminPostReducer from './reducer/adminPostReducer';

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ['user', 'token']
// };

// const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
     auth: authReducer,
    // auth: persistedAuthReducer,
    post: propertyReducer,
    review: reviewReducer,
    booking: bookingReducer,
    payment: paymentReducer,
    invoice: invoiceReducer,
    adminAuth: adminAuthReducer,
    adminHomeDash: adminHomeDashReducer,
    adminDashboard: adminDashboardReducer,
    adminHost: adminHostReducer,
    adminGuest: adminGuestReducer,
    adminBannedUser: adminBannedUserReducer,
    adminBannedProperty: adminBannedPropertyReducer,
    adminPost: adminPostReducer,
  },
});

export const persistor = persistStore(store);

export default store;
