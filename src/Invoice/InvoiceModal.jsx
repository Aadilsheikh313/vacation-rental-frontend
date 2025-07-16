import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { downloadBookingInvoiceRecipet } from "../config/redux/action/invoiceAction";

const InvoiceModal = ({ show, onClose, invoice }) => {
 
 const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
 

   if (!invoice) return null;

  const handleDownload = async () => {
    try {
      await dispatch(downloadBookingInvoiceRecipet({ bookingId: invoice.booking._id, token }));
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Invoice Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Invoice Number:</strong> {invoice.invoiceNumber}</p>
        <p><strong>Property:</strong> {invoice.property?.title}</p>
        <p><strong>Total Amount:</strong> ₹{invoice.booking?.totalAmount}</p>
        <p><strong>Guest:</strong> {invoice.user?.name} ({invoice.user?.email})</p>
        <p><strong>Invoice Generated On:</strong> {new Date(invoice.createdAt).toLocaleDateString()}</p>

        <div className="d-flex justify-content-end mt-4">
          <Button variant="secondary" onClick={onClose} className="me-2">
            Close
          </Button>
          <Button variant="primary" onClick={handleDownload}>
            Download Invoice PDF
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default InvoiceModal;
