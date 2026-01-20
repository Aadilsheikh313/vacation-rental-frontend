import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import styles from "../stylesModule/Footer.module.css"

function Footer() {
  return (
    <footer className={styles.FooterContainer}>
      <Container>
        <Row>
          <Col md={3} sm={6}>
            <h5 className={styles.Heading}>Support</h5>
            <ul className="list-unstyled">
              <li><a href="#" className={styles.textlight}>Help Center</a></li>
              <li><a href="#" className={styles.textlight}>AirCover</a></li>
              <li><a href="#" className={styles.textlight}>Cancellation options</a></li>
              <li><a href="#" className={styles.textlight}>Safety information</a></li>
            </ul>
          </Col>

          <Col md={3} sm={6}>
            <h5 className="text-uppercase mb-3">Hosting</h5>
            <ul className="list-unstyled">
              <li><a href="#" className={styles.textlight}>Become a Host</a></li>
              <li><a href="#" className={styles.textlight}>Airbnb Setup</a></li>
              <li><a href="#" className={styles.textlight}>Host responsibly</a></li>
              <li><a href="#" className={styles.textlight}>Community forum</a></li>
            </ul>
          </Col>

          <Col md={3} sm={6}>
            <h5 className="text-uppercase mb-3">Company</h5>
            <ul className="list-unstyled">
              <li><a href="#" className={styles.textlight}>About</a></li>
              <li><a href="#" className={styles.textlight}>Careers</a></li>
              <li><a href="#" className={styles.textlight}>Newsroom</a></li>
              <li><a href="#" className={styles.textlight}>Investors</a></li>
            </ul>
          </Col>

          <Col md={3} sm={6}>
            <h5 className="text-uppercase mb-3">Connect</h5>
            <div className="d-flex gap-3">
              <a href="#" className={styles.textlightfs5}><FaFacebookF /></a>
              <a href="#" className={styles.textlightfs5}><FaTwitter /></a>
              <a href="#" className={styles.textlightfs5}><FaInstagram /></a>
            </div>
            <p className="mt-3">🌐 English (IN) | ₹ INR</p>
          </Col>
        </Row>

        <hr className="border-light mt-4" />

        <Row className={"justify-content-between align-items-center"}>
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">© 2025 AadilVacationRental, Inc.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <a href="#" className="text-light me-3">Privacy</a>
            <a href="#" className="text-light me-3">Terms</a>
            <a href="#" className={styles.textlight}>Sitemap</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
