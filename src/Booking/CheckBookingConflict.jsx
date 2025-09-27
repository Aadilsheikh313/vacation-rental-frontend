// import React from "react";
// import { Modal, Button } from "react-bootstrap";

// const CheckBookingConflict = ({ conflictData, existingBooking, isError, message, onClose }) => {
//   return (
//     <Modal show={true} onHide={onClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>⚠️ Booking Conflict</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         {isError ? (
//           <p className="text-danger">{message}</p>
//         ) : existingBooking ? (
//           <>
//             {console.log("Already booking", existingBooking)}
//             <div>
//               <p className="text-warning">
//                 You have already booked this property!
//               </p>
//               <p>
//                 Booking Dates:{" "}
//                 <b>
//                   {new Date(existingBooking.checkIn).toLocaleDateString()} -{" "}
//                   {new Date(existingBooking.checkOut).toLocaleDateString()}
//                 </b>
//               </p>
//               <p>
//                 To edit your booking, visit your <b>Guest Dashboard</b>.
//               </p>
//             </div>
//           </>

//         ) : conflictData?.bookedDates?.length > 0 ? (
//           <div>
//             <p>This property is already booked for the following dates:</p>
//             <ul>
//               {conflictData.bookedDates.map((d, i) => (
//                 <li key={i}>
//                   {new Date(d.checkIn).toLocaleDateString()} -{" "}
//                   {new Date(d.checkOut).toLocaleDateString()}
//                 </li>
//               ))}
//             </ul>
//             <p className="text-danger">
//               Please select different check-in / check-out dates.
//             </p>
//           </div>
//         ) : (
//           <p className="text-success">
//             ✅ Good news! This property is available for your selected dates.
//           </p>
//         )}
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default CheckBookingConflict;
import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const CheckBookingConflict = ({ conflictData, existingBooking, isError, message, onClose }) => {
  useEffect(() => {
    if (existingBooking) {
      console.log("Already booking", existingBooking);
    }
  }, [existingBooking]); // dependency array → jab existingBooking change ho tab log hoga

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>⚠️ Booking Conflict</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {isError ? (
          <p className="text-danger">{message}</p>
        ) : existingBooking ? (
          <div>
            <p className="text-warning">
              You have already booked this property!
            </p>
            <p>
              Booking Dates:{" "}
              <b>
                {new Date(existingBooking.checkIn).toLocaleDateString()} -{" "}
                {new Date(existingBooking.checkOut).toLocaleDateString()}
              </b>
            </p>
            <p>
              To edit your booking, visit your <b>Guest Dashboard</b>.
            </p>
          </div>
        ) : conflictData?.bookedDates?.length > 0 ? (
          <div>
            <p>This property is already booked for the following dates:</p>
            <ul>
              {conflictData.bookedDates.map((d, i) => (
                <li key={i}>
                  {new Date(d.checkIn).toLocaleDateString()} -{" "}
                  {new Date(d.checkOut).toLocaleDateString()}
                </li>
              ))}
            </ul>
            <p className="text-danger">
              Please select different check-in / check-out dates.
            </p>
          </div>
        ) : (
          <p className="text-success">
            ✅ Good news! This property is available for your selected dates.
          </p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckBookingConflict;
