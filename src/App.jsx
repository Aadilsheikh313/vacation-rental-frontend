
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
import Payment from './Payment/Payment';
import { useDispatch, useSelector } from 'react-redux';
import ExploreAndStay from './HeroSection/Explore_Stays';
import TouristAndPlace from './HeroSection/Tourist_Places';
import TopSpots from './HeroSection/Top_Spots';
import FoodAndFun from './HeroSection/FoodAndFun';
import PostTripMoments from './GuestDashbord/Post_Trip_Moments';
import ExperienceHub from './GuestDashbord/Experience_Hub';
import AdminRegister from './AdminPlane/AdminRegister';
import AdminNavbar from './AdminPlane/AdminNavbar';
import AdminLogin from './AdminPlane/AdminLogin';
import AdminDashboard from './AdminPlane/AdminDashboard';
import AdminHome from './AdminPlane/AdminHome';
import AdminSinglePropertyDetails from './AdminPlane/AdminSinglePropertyDetails';
import AdminHostHome from './AdminPlane/Host/AdminHostHome';
import AdminGuestHome from './AdminPlane/Guest/AdminGuestHome';
import AdminPostProperty from './AdminPlane/AdminPostPlace/AdminPostProperty';
import GetAllAdminPosts from './AdminPlane/AdminPostPlace/GetAllAdminPost';
import AdminGetSinglePost from './AdminPlane/AdminPostPlace/AdminGetSinglePost';
import AdminEditPost from './AdminPlane/AdminPostPlace/AdminEditPost';
import GetTouristSinglePlace from './HeroSection/Touriste_SinglePlaces';
import TripHomePage from './PlanOurTrip/Home';
import AboutPage from './About/AboutPage';
import GetAllRooms from './pages/AllGetRooms';
import HomeTroust from './TrouistPlace/Home';
import CompanyAddress from './Contact/CompnayAddress';
import CashPayment from './Payment/CashPayment';
import VerificationPayment from './Payment/VerificationPayment';

function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const isAdminRoute = location.pathname.startsWith("/admin");


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
        <Route path="/touristplace/:id" element={<GetTouristSinglePlace />} />
        <Route path='/top-spots' element={<TopSpots />} />
        <Route path='/plan-my-trip' element={<TripHomePage />} />
        <Route path='/testy-food' element={<FoodAndFun />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/getAllproperty' element={<GetAllRooms />} />
        <Route path='/explore' element={<HomeTroust />} />
        <Route path="/contact" element={<CompanyAddress />} />
        <Route path="/cash-payment" element={<CashPayment />} />
        <Route path="/payment-verification" element={<VerificationPayment />} />

        {/* Admin Routes */}
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route path='/admin/host-users' element={<AdminHostHome />} />
        <Route path='/admin/guest-users' element={<AdminGuestHome />} />
        <Route path='/admin/Post' element={<AdminPostProperty />} />
        <Route path='/admin/property/:id' element={<AdminSinglePropertyDetails />} />
        <Route path='/admin/get-posts' element={<GetAllAdminPosts />} />
        <Route path="/admin/post/:id" element={<AdminGetSinglePost />} />
        <Route path="/admin/adminedit/:id" element={<AdminEditPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* {!isAdminRoute && <Footer />} */}
      <Footer />
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
