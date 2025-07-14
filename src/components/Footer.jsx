import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-5">
      <Container>
        <Row>
          <Col md={3} sm={6}>
            <h5 className="text-uppercase mb-3">Support</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Help Center</a></li>
              <li><a href="#" className="text-light">AirCover</a></li>
              <li><a href="#" className="text-light">Cancellation options</a></li>
              <li><a href="#" className="text-light">Safety information</a></li>
            </ul>
          </Col>

          <Col md={3} sm={6}>
            <h5 className="text-uppercase mb-3">Hosting</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">Become a Host</a></li>
              <li><a href="#" className="text-light">Airbnb Setup</a></li>
              <li><a href="#" className="text-light">Host responsibly</a></li>
              <li><a href="#" className="text-light">Community forum</a></li>
            </ul>
          </Col>

          <Col md={3} sm={6}>
            <h5 className="text-uppercase mb-3">Company</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">About</a></li>
              <li><a href="#" className="text-light">Careers</a></li>
              <li><a href="#" className="text-light">Newsroom</a></li>
              <li><a href="#" className="text-light">Investors</a></li>
            </ul>
          </Col>

          <Col md={3} sm={6}>
            <h5 className="text-uppercase mb-3">Connect</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-5"><FaFacebookF /></a>
              <a href="#" className="text-light fs-5"><FaTwitter /></a>
              <a href="#" className="text-light fs-5"><FaInstagram /></a>
            </div>
            <p className="mt-3">🌐 English (IN) | ₹ INR</p>
          </Col>
        </Row>

        <hr className="border-light mt-4" />

        <Row className="justify-content-between align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">© 2025 VacationRental, Inc.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <a href="#" className="text-light me-3">Privacy</a>
            <a href="#" className="text-light me-3">Terms</a>
            <a href="#" className="text-light">Sitemap</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
