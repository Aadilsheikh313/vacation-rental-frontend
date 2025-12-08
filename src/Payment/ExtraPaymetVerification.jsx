import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../stylesModule/Payment/PaymentVerfication.module.css";
import { Card } from "react-bootstrap";
import { fetchPaymentStatus } from "../config/redux/action/paymentAction";
import { IoArrowBackOutline, IoArrowRedoOutline } from "react-icons/io5";
import { RiShieldCheckFill } from "react-icons/ri";
import { FcCancel } from "react-icons/fc";
import { TbShieldCheck } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { FaHotel, FaCalendarCheck, FaCalendarTimes, FaRegMoon, FaKey, FaRupeeSign, FaReceipt, FaBarcode, FaExchangeAlt, FaCreditCard, FaClock } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";


const ExtraPaymentVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams(); // fetch bookingId from URL if refreshed
  const bookingId = params.get("bookingId");

  const { paymentResult, isSuccess, isError, message } = useSelector(
    (state) => state.payment
  );

  const { token } = useSelector((state) => state.auth);

  // 🔥 Fetch data even on refresh
  useEffect(() => {
    if (bookingId) {
      dispatch(fetchPaymentStatus({ token, bookingId }));
    }
  }, [bookingId, token, dispatch]);


  let payment = paymentResult?.payment;
  let booking = paymentResult?.booking;

  const handleHome = () => {
    navigate("/")
  }
  const handleMyTrips = () => {
    navigate("/my-bookings");
  }

  return (
    <div className={styles.PayemtContainer}>
      <Card className={styles.PaymetCard}>
        {/* ❌ FAILED */}
        {isError && (
          <div className={styles.failedBox}>
            <FcCancel className={styles.failedIcon} />
            <h2 className={styles.failedTitle}>Payment Failed</h2>
            <p className={styles.failedMessage}>{message}</p>

            <button className={styles.primaryBtn} onClick={() => navigate("/my-bookings")}>
              Go to My Bookings
            </button>
          </div>
        )}

        {/* 🔄 VERIFYING */}
        {!isError && !isSuccess && (
          <div className={styles.verifyBox}>
            <AiOutlineLoading3Quarters className={styles.loadingIcon} />
            <h2 className={styles.verifyingText}>Verifying Payment...</h2>
            <p className={styles.waitMsg}>Please wait, do not close this page.</p>
            <div className={styles.secureTag}>
              <TbShieldCheck /> Your payment is being securely validated with Razorpay
            </div>
          </div>
        )}

        {/* ✔ SUCCESS */}
        {isSuccess && payment && booking && (
          <>
            <MdVerified className={styles.PaymentVerfiIcon} />
            <h2>Payment Verified Successfully!</h2>
            <p className={styles.PaymetSubTitel}>
              <GiPartyPopper />
              Your booking is confirmed — enjoy your stay! 🌟
            </p>


            <h4 className={styles.summaryHeading}>
              <RiShieldCheckFill className={styles.summaryIcon} />
              Payment Summary
            </h4>

            <ul className={styles.summaryList}>
              <li><FaHotel className={styles.iconHotel} /> <strong>Property:</strong> {booking.property?.title}</li>
              <li><FaCalendarCheck className={styles.iconCheckIn} /> <strong>New Check In:</strong> {new Date(booking.checkIn).toLocaleDateString()}</li>
              <li><FaCalendarTimes className={styles.iconCheckOut} /> <strong>New Check Out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</li>
              <li><FaRegMoon className={styles.iconNights} /> <strong>Total Nights:</strong> {booking.numberOfNights}</li>
              <li><FaKey className={styles.iconCode} /> <strong>Booking Code:</strong> {booking.bookingCode}</li>
              <li><FaRupeeSign className={styles.iconAmount} /> <strong>Amount Paid:</strong> ₹{payment.amount}</li>
              <li><FaReceipt className={styles.iconReceipt} /> <strong>Payment ID:</strong> {payment.razorpay_payment_id}</li>
              <li><FaBarcode className={styles.iconOrder} /> <strong>Order ID:</strong> {payment.razorpay_order_id}</li>
              <li><FaExchangeAlt className={styles.iconTxn} /> <strong>Transaction ID:</strong> {payment.razorpay_payment_id}</li>
              <li><FaCreditCard className={styles.iconMethod} /> <strong>Payment Method:</strong> {payment.method || payment.paymentMethod}</li>
              <li><FaClock className={styles.iconTime} /> <strong>Paid At:</strong> {new Date(payment.createdAt).toLocaleString()}</li>
            </ul>

            <p className={styles.redirectText}>
              Redirecting to <b>My Bookings / Home</b> page...
            </p>

            <div className={styles.actionBtnBox}>
              <button className={styles.homeBtn} onClick={handleHome}>
                <IoArrowBackOutline /> Home
              </button>
              <button className={styles.tripBtn} onClick={handleMyTrips}>
                My Trips <IoArrowRedoOutline />
              </button>
            </div>


          </>
        )}
      </Card>
    </div>
  );
};

export default ExtraPaymentVerification;
