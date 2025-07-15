
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Home from './pages/Home';
import Footer from './components/Footer';
import CustomNavbar from './components/Navbar';
import NotFound from './pages/NotFound';
import Registerpage from './pages/Register';
import Login from './pages/Login';
import UserProfile from './components/userProfile';
import AddPropertyForm from './pages/AddProperty';
import PropertyView from './pages/propertyView';
import EditProperty from './pages/EditProperty';
import HostDashboard from './HostDashboard';
import Expire from './HostDashboard/ReactiveExpire';
import AllExpired from './HostDashboard/AllExpired';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingForm from './Booking/BookingForm';
import MyBooking from './Booking/MyBookings';
import GuestDashborad from './GuestDashbord/Index';
import CurrentBooking from './HostDashboard/Booking-Property/Current-booking';
import BookingHistory from './HostDashboard/Booking-Property/Booking-History';
import Payment from './Payment/Index';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './config/redux/action/authAction';



function App() {
  const dispatch = useDispatch();
  const {token } = useSelector((state) => state.auth);
  

  useEffect(() => {
    if (token) {
      dispatch(getUser({ token }));
    }
  }, [dispatch, token]);
  return (
    <Router>
      <CustomNavbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/registerpage" element={<Registerpage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/host/add-property' element={<AddPropertyForm />} />
        <Route path="/property/:id" element={<PropertyView />} />
        <Route path="/edit/:id" element={<EditProperty />} />
        <Route path='/host/dashboard' element={<HostDashboard />} />
        <Route path="/host/expired-properties" element={<Expire />} />
        <Route path='/host/all-expired-property' element={<AllExpired />} />
        <Route path='bookingFrom/:id' element={<BookingForm />} />
        <Route path='/my-bookings' element={<MyBooking />} />
        <Route path='/host/check-bookings' element={<CurrentBooking />} />
        <Route path='/guest/dashboard' element={<GuestDashborad />} />
        <Route path='/host/history-bookings' element={<BookingHistory />} />
        <Route path="/payment/:id" element={<Payment />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>

  )
}

export default App
