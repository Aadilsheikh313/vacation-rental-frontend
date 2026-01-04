import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../config/redux/action/authAction";
import { toast } from "react-toastify";
import styles from "../stylesModule/Register.module.css";

const Registerpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const [roleChoice, setRoleChoice] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const [showHostModal, setShowHostModal] = useState(false);
  const [governmentID, setGovernmentID] = useState("");
  const [governmentIDNumber, setGovernmentIDNumber] = useState("");
  const [governmentIDImage, setGovernmentIDImage] = useState(null);
  const [cancelledChequeImage, setCancelledChequeImage] = useState(null);
  const [upiQRCode, setUpiQRCode] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [payout, setPayout] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
  });

  // Handle Guest Registration
  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !name || !phone) {
      toast.error("Please fill all fields");
      return;
    }

    if (roleChoice === "host") {
      setShowHostModal(true);
      return;
    }

    const userData = { email, password, phone, role: roleChoice, name };
    dispatch(registerUser(userData));
  };

  // Handle Host Registration
  const handleHostRegister = () => {
    if (!name || !email || !phone || !password) {
      toast.error("Please fill all basic fields first");
      return;
    }

    if (!governmentID || !governmentIDNumber || !governmentIDImage || !cancelledChequeImage) {
      toast.error("Please complete all host details and upload required documents");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", roleChoice);
    formData.append("governmentID", governmentID);
    formData.append("governmentIDNumber", governmentIDNumber);
    formData.append("payout", JSON.stringify(payout));
    formData.append("upiId", upiId);
    formData.append("governmentIDImage", governmentIDImage);
    formData.append("cancelledChequeImage", cancelledChequeImage);
    if (upiQRCode) formData.append("qrCode", upiQRCode);

    dispatch(registerUser(formData));
    setShowHostModal(false);
  };

  // Handle Success/Error
  useEffect(() => {
    if (isSuccess) {
      toast.success("Registration successful!");
      setEmail("");
      setPassword("");
      setPhone("");
      setName("");
      setRoleChoice("");
      navigate("/");
    }
    if (isError) {
      toast.error(message);
    }
  }, [isSuccess, isError, message]);

  // Role Selection Screen
  if (!roleChoice) {
    return (
      <div className={styles.roleSelectionContainer}>
        <h2 className={styles.headingChoose}>Register As</h2>
        <Row className="justify-content-center">
          <Col md={4}>
            <Card className={styles.registerCard} onClick={() => setRoleChoice("guest")}>
              <Card.Body className="text-center">
                <h3 className={styles.heading}>Guest Register</h3>
                <p>Register as a Guest to book properties easily.</p>
                <p>Explore amazing listings from trusted hosts.</p>
                <p>Get special offers and secure payments.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={styles.registerCard} onClick={() => setRoleChoice("host")}>
              <Card.Body className="text-center">
                <h3 className={styles.heading}>Host Register</h3>
                <p>Register as a Host to list your property.</p>
                <p>Manage bookings efficiently and earn more.</p>
                <p>Receive payments safely with verified details.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  // Registration Form
  return (
    <Container className={styles.registerContainer}>

      <Card className={styles.MainregisterCard}>

        <div className={styles.registerTop}>
          <h3>Create to Account</h3>
          <p>Start your journey with trust, comfort, and opportunity — create your account today.</p>
          <div className={styles.loginBTN}>
            Already have an account? <Link to="/login" className={styles.loginLink}>Login</Link>
          </div>
        </div>

        <div className={styles.registerBootom}>
          <h3>WelCome To  </h3>
          <h3>Create Your Account — Start Your Journey Today!</h3>
          <p>We’re so excited to have you here. Let’s get you started!</p>
          <img src="/registerImage.jpg" alt="Illustration" className={styles.image} />
        </div>

        <Row className="align-items-center">
          <Col md={6} className={styles.right}>
            <Button className={styles.backBTN} onClick={() => setRoleChoice("")}>
              ← Back
            </Button>
            <h2 className={styles.headingregister}>
              Sign Up as {roleChoice.charAt(0).toUpperCase() + roleChoice.slice(1)}
            </h2>

            <Form onSubmit={handleRegister} className={styles.form}>
              <Form.Group className="mb-2">
                <Form.Label>Registering as</Form.Label>
                <Form.Control type="text" value={roleChoice} disabled />
              </Form.Group>

              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" required value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} />
              </Form.Group>

              {roleChoice === "host" ? (
                <Button variant="success" className="mt-3" onClick={() => setShowHostModal(true)}>
                  Next
                </Button>
              ) : (
                <Button type="submit" variant="success" className={styles.registerBTN} disabled={isLoading}>
                  {isLoading ? "Registering..." : "Sign Up"}
                </Button>
              )}

              {/* Host Modal */}
              <Modal show={showHostModal} onHide={() => setShowHostModal(false)}
                size="lg"
                scrollable
                className={styles.HostModel}>
                <Modal.Header>
                  <Modal.Title className={styles.hostModelTitle}>Host KYC & Bank Verification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label>Government ID Type</Form.Label>
                      <Form.Select value={governmentID} onChange={(e) => setGovernmentID(e.target.value)}>
                        <option value="">Select ID</option>
                        <option value="passport">Passport</option>
                        <option value="voter-id">Voter ID</option>
                        <option value="driving-license">Driving License</option>
                        <option value="Aadhaar-card">Aadhaar Card</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Government ID Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter ID Number"
                        value={governmentIDNumber}
                        onChange={(e) => setGovernmentIDNumber(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Upload Government ID Image</Form.Label>
                      <Form.Control type="file" onChange={(e) => setGovernmentIDImage(e.target.files[0])} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Upload Cancelled Cheque</Form.Label>
                      <Form.Control type="file" onChange={(e) => setCancelledChequeImage(e.target.files[0])} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Upload UPI QR Code (Optional)</Form.Label>
                      <Form.Control type="file" onChange={(e) => setUpiQRCode(e.target.files[0])} />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>UPI ID</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your UPI ID"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Bank Details</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Account Holder Name"
                        value={payout.accountHolderName}
                        onChange={(e) => setPayout({ ...payout, accountHolderName: e.target.value })}
                      />
                      <Form.Control
                        type="text"
                        placeholder="Account Number"
                        value={payout.accountNumber}
                        onChange={(e) => setPayout({ ...payout, accountNumber: e.target.value })}
                      />
                      <Form.Control
                        type="text"
                        placeholder="IFSC Code"
                        value={payout.ifscCode}
                        onChange={(e) => setPayout({ ...payout, ifscCode: e.target.value })}
                      />
                      <Form.Control
                        type="text"
                        placeholder="Bank Name"
                        value={payout.bankName}
                        onChange={(e) => setPayout({ ...payout, bankName: e.target.value })}
                      />
                      <Form.Control
                        type="text"
                        placeholder="Branch Name"
                        value={payout.branchName}
                        onChange={(e) => setPayout({ ...payout, branchName: e.target.value })}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer className={styles.modelFooter}>
                  <Button className={styles.cancellBTN} onClick={() => setShowHostModal(false)}>
                    Cancel
                  </Button>
                  <Button className={styles.sucessBTN} onClick={handleHostRegister}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Registerpage;
