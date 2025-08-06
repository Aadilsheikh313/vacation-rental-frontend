import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { adminPostExperience } from "../../config/redux/action/adminPostAction";

const AdminPostProperty = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.adminPost
  );

  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    title: "",
    description: "",
    country: "",
    city: "",
    location: "",
    bestTimeToVisit: "",
    history: "",
    tips: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      alert("Image is required!");
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    data.append("image", image);

    dispatch(adminPostExperience(data));
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h3 className="mb-4">Admin Post Experience</h3>

          {isSuccess && <Alert variant="success">{message}</Alert>}
          {isError && <Alert variant="danger">{message}</Alert>}

          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row>
              <Col md={6}>
                <Form.Group controlId="category" className="mb-3">
                  <Form.Group controlId="title" className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Natural">Natural</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Urban">Urban</option>
                    <option value="Theme Park">Theme Park</option>
                    <option value="Wellness & Spiritual">Wellness & Spiritual</option>
                    <option value="Adventure Sports">Adventure Sports</option>
                    <option value="Culinary">Culinary</option>
                    <option value="Offbeat & Remote">Offbeat & Remote</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="subcategory" className="mb-3">
                  <Form.Label>Subcategory</Form.Label>
                  <Form.Control
                    type="text"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>



                <Form.Group controlId="description" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="country" className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="city" className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="location" className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="image" className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="img-thumbnail mt-2"
                      width="200"
                    />
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="bestTimeToVisit" className="mb-3">
              <Form.Label>Best Time to Visit</Form.Label>
              <Form.Control
                type="textarea"
                rows={2}
                name="bestTimeToVisit"
                value={formData.bestTimeToVisit}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="history" className="mb-3">
              <Form.Label>History</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="history"
                value={formData.history}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="tips" className="mb-3">
              <Form.Label>Tips (comma separated)</Form.Label>
              <Form.Control
                type="textarea"
                name="tips"
                value={formData.tips}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isLoading}
              className="mt-3"
            >
              {isLoading ? (
                <>
                  <Spinner animation="border" size="sm" /> Posting...
                </>
              ) : (
                "Post Experience"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPostProperty;
