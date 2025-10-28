import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const VerifiedModal = ({ show, onClose, onSubmit }) => {
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    onSubmit(note);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Verify Host</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to verify this host?</p>
        <Form.Group>
          <Form.Label>Admin Note (optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Add verification note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Verify Host
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VerifiedModal;
