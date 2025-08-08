import React, { useEffect, useState } from "react";
import { Container, Form, Button, Spinner, Alert, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSinglePostAdmin, admineditPosts } from "../../config/redux/action/adminPostAction";
import { resetadminEditPost } from "../../config/redux/reducer/adminPostReducer";

const AdminEditPost = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { singleAdminPost, isLoading, isError, message } = useSelector((state) => state.adminPost);
    const { token } = useSelector((state) => state.adminAuth);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        subcategory: "",
        category: "",
        country: "",
        city: "",
        location: "",
        bestTimeToVisit: "",
        history: "",
        tips: "",
        isApproved: false,
        image: null
    });

    // ✅ Fetch existing post details
    useEffect(() => {
        if (id) {
            dispatch(getSinglePostAdmin(id));
        }
        return () => {
            dispatch(resetadminEditPost());
        };
    }, [dispatch, id]);

    // ✅ Fill form data from API
    useEffect(() => {
        if (singleAdminPost) {
            setFormData({
                title: singleAdminPost.title || "",
                description: singleAdminPost.description || "",
                subcategory: singleAdminPost.subcategory || "",
                category: singleAdminPost.category || "",
                country: singleAdminPost.country || "",
                city: singleAdminPost.city || "",
                location: singleAdminPost.location || "",
                bestTimeToVisit: singleAdminPost.bestTimeToVisit || "",
                history: singleAdminPost.history || "",
                tips: singleAdminPost.tips?.join(", ") || "",
                isApproved: singleAdminPost.isApproved || false,
                image: null
            });
        }
    }, [singleAdminPost]);

    // ✅ Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "file") {
            setFormData((prev) => ({ ...prev, image: files[0] }));
        } else if (type === "checkbox") {
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // ✅ Submit form
    const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
        if (key === "tips") {
            payload.append(key, formData[key].split(",").map((tip) => tip.trim()));
        } else if (formData[key] !== null) {
            payload.append(key, formData[key]);
        }
    });

    dispatch(admineditPosts({ id, updatedData: payload, token }))
        .unwrap()
        .then(() => {
            navigate(`/admin-single-post/${id}`); // ✅ Edit ke baad single post page
        })
        .catch((err) => {
            console.error("Edit failed:", err);
        });
};


    if (isLoading && !singleAdminPost) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading post details...</p>
            </Container>
        );
    }

    if (isError) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{message || "Error fetching post details"}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Card className="shadow p-4">
                <h3 className="mb-4 text-center">Edit Experience Post</h3>
                <Form onSubmit={handleSubmit}>
                    {/* Title */}
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Description */}
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            rows={3}
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Subcategory */}
                    <Form.Group className="mb-3">
                        <Form.Label>Subcategory</Form.Label>
                        <Form.Control
                            type="text"
                            name="subcategory"
                            value={formData.subcategory}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Category */}
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Country */}
                    <Form.Group className="mb-3">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* City */}
                    <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Location */}
                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Best Time To Visit */}
                    <Form.Group className="mb-3">
                        <Form.Label>Best Time To Visit</Form.Label>
                        <Form.Control
                            type="text"
                            name="bestTimeToVisit"
                            value={formData.bestTimeToVisit}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* History */}
                    <Form.Group className="mb-3">
                        <Form.Label>History</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="history"
                            rows={2}
                            value={formData.history}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Tips */}
                    <Form.Group className="mb-3">
                        <Form.Label>Tips (comma separated)</Form.Label>
                        <Form.Control
                            type="text"
                            name="tips"
                            value={formData.tips}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Approval */}
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            name="isApproved"
                            checked={formData.isApproved}
                            onChange={handleChange}
                            label="Approved"
                        />
                    </Form.Group>

                    {/* Image */}
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" name="image" onChange={handleChange} />
                        {singleAdminPost?.images?.[0]?.url && (
                            <div className="mt-2">
                                <img
                                    src={singleAdminPost.images[0].url}
                                    alt="Post"
                                    style={{ width: "150px", borderRadius: "8px" }}
                                />
                            </div>
                        )}
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            {isLoading ? <Spinner size="sm" animation="border" /> : "Update Post"}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default AdminEditPost;
