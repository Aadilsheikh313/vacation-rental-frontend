
// import React, { useState, useEffect } from "react";
// import {Link} from "react-router-dom"
// import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../config/redux/action/authAction";
// import { useAuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import styles from "../stylesModule/Register.module.css";


// const Registerpage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { login } = useAuthContext();

//   const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [role, setRole] = useState("");
//   const [name, setName] = useState("");

//   const handleRegister = (e) => {
//     e.preventDefault();

//     if (!email || !password || !name || !phone || !role) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     const userData = { email, password, phone, role, name };
//     dispatch(registerUser(userData));
//   };

//   // handle registration status
//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Registration successful. Please login.");
//       setEmail(""); setPassword(""); setPhone(""); setRole(""); setName("");

//       // Optional: update context
//       login({ name, email, role });

//       // Redirect to login
//       navigate("/");
//     }

//     if (isError) {
//       toast.error(message);
//     }
//   }, [isSuccess, isError, message]);

//   return (
//     <Card className={styles.cardSingup}>
//       <Container className={styles.cardContainer}>
//         <Row className="justify-content-md-center">
//           <Col md={6} className={styles.leftHalfContainer}>
//             <h3>Welcome to your Happy Vacations</h3>
//             <h5>Explore <span>your amazing city</span></h5>
//             <img src="./register.jpg" alt="Aadil Sheikh" />
//           </Col>

//           <Col md={6} className={styles.rightHalfContainer}>
//             <h2 className={styles.heading}>Sign Up</h2>

//             <Form onSubmit={handleRegister} className={styles.cardForm}>
//               <Form.Select value={role} onChange={(e) => setRole(e.target.value)} required>
//                 <option value="">Select Role</option>
//                 <option value="host">Host</option>
//                 <option value="guest">Guest</option>
//               </Form.Select>

//               <Form.Group>
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control type="text" required value={name} onChange={(e) => setName(e.target.value)} />
//               </Form.Group>

//               <Form.Group>
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
//               </Form.Group>

//               <Form.Group>
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
//               </Form.Group>

//               <Form.Group>
//                 <Form.Label>Phone</Form.Label>
//                 <Form.Control type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} />
//               </Form.Group>

//               <Button type="submit" className="mt-3" variant="success" disabled={isLoading}>
//                 {isLoading ? "Registering..." : "Sign Up"}
//               </Button>
//               <Button variant="primary" className="mt-2">
//                 <Link to="/login" className={styles.loginButton}>
//                  Login
//                  </Link>
            
//               </Button>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     </Card>
//   );
// };

// export default Registerpage;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../config/redux/action/authAction";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import styles from "../stylesModule/Register.module.css";

const Registerpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !name || !phone || !role) {
      toast.error("Please fill all fields");
      return;
    }

    const userData = { email, password, phone, role, name };
    dispatch(registerUser(userData));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Registration successful!");
      setEmail(""); setPassword(""); setPhone(""); setRole(""); setName("");
      login({ name, email, role });
      navigate("/");
    }

    if (isError) {
      toast.error(message);
    }
  }, [isSuccess, isError, message]);

  return (
    <Container className={styles.registerContainer}>
      <Card className={styles.registerCard}>
        <Row className="align-items-center">
          {/* Left Side: Illustration */}
          <Col md={6} className={styles.left}>
            <h3>Welcome Back :)</h3>
            <p>We’re so excited to have you here. Let’s get you started!</p>
            <img src="/registerImage.jpg" alt="Illustration" className={styles.image} />
          </Col>

          {/* Right Side: Form */}
          <Col md={6} className={styles.right}>
            <h2 className={styles.heading}>Sign Up</h2>
            <Form onSubmit={handleRegister} className={styles.form}>
              <Form.Select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="">Register As</option>
                <option value="host">Host</option>
                <option value="guest">Guest</option>
              </Form.Select>

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

              <Button type="submit" variant="success" className="mt-3" disabled={isLoading}>
                {isLoading ? "Registering..." : "Sign Up"}
              </Button>

              <div className="mt-3 text-center">
                Already have an account? <Link to="/login" className={styles.loginLink}>Login</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Registerpage;
