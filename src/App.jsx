
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
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
import ExploreAndStay from './HeroSection/Explore_Stays';
import TouristAndPlace from './HeroSection/Tourist_Places';
import TopSpots from './HeroSection/Top_Spots';
import PlanMyTrip from './HeroSection/Plan_My_Trip';
import FoodAndFun from './HeroSection/FoodAndFun';
import PostTripMoments from './GuestDashbord/Post_Trip_Moments';
import ExperienceHub from './GuestDashbord/Experience_Hub';
import AdminRegister from './AdminPlane/AdminRegister';
import AdminNavbar from './AdminPlane/AdminNavbar';
import AdminLogin from './AdminPlane/AdminLogin';
import AdminDashboard from './AdminPlane/AdminDashboard';

function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (token) {
      dispatch(getUser({ token }));
    }
  }, [dispatch, token]);

  return (
    <>
        {isAdminRoute ? <AdminNavbar /> : <CustomNavbar />}
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
        <Route path='/Post-Trip-Moments' element={<PostTripMoments />} />
        <Route path='/Experience-Hub' element={<ExperienceHub />} />
        <Route path='/host/history-bookings' element={<BookingHistory />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path='/explore/properties' element={<ExploreAndStay />} />
        <Route path='/explore' element={<TouristAndPlace />} />
        <Route path='/top-spots' element={<TopSpots />} />
        <Route path='/plan-my-trip' element={<PlanMyTrip />} />
        <Route path='/testy-food' element={<FoodAndFun />} />

        {/* Admin Routes */}
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* {!isAdminRoute && <Footer />} */}
      <Footer/>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
