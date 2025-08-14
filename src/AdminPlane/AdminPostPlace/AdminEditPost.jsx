import React, { useEffect, useState } from "react";
import { Container, Form, Button, Spinner, Alert, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetadminEditPost } from "../../config/redux/reducer/adminPostReducer";
import { admineditPosts, getSinglePostAdmin } from "../../config/redux/action/adminPostAction";
import { showSuccess } from "../../utils/toastUtils";

const AdminEditPost = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { admineditPost, singleAdminPost, isLoading, isError, message } = useSelector(
        (state) => state.adminPost
    );
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

    // Fetch post details
    useEffect(() => {
        if (id) {
            dispatch(getSinglePostAdmin(id));
        }
        return () => {
            dispatch(resetadminEditPost());
        };
    }, [dispatch, id]);

    // Fill form data from API response
    useEffect(() => {
        if (singleAdminPost && typeof singleAdminPost === "object") {
            setFormData({
                title: singleAdminPost?.title || "",
                description: singleAdminPost?.description || "",
                subcategory: singleAdminPost?.subcategory || "",
                category: singleAdminPost?.category || "",
                country: singleAdminPost?.country || "",
                city: singleAdminPost?.city || "",
                location: singleAdminPost?.location || "",
                bestTimeToVisit: singleAdminPost?.bestTimeToVisit || "",
                history: singleAdminPost?.history || "",
                tips: Array.isArray(singleAdminPost?.tips) ? singleAdminPost.tips.join(", ") : "",
                isApproved: singleAdminPost?.isApproved || false,
                image: null
            });
        }
    }, [singleAdminPost]);

    // Handle form input change
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

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare clean object without FormData
        const updatedData = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            subcategory: formData.subcategory.trim(),
            category: formData.category.trim(),
            country: formData.country.trim(),
            city: formData.city.trim(),
            location: formData.location.trim(),
            bestTimeToVisit: formData.bestTimeToVisit.trim(),
            history: formData.history.trim(),
            tips: formData.tips.trim(),
            isApproved: formData.isApproved,
            image: formData.image, // can be null or File
        };

        dispatch(admineditPosts({ id, token, updatedData }))
            .unwrap()
            .then(() => {
                showSuccess("Admin Post updated successfully");
                dispatch(resetadminEditPost());
                navigate(`/admin/post/${id}`);
            })
            .catch((err) => {
                console.error("Update failed:", err);
            });
    };


    if (isLoading && !admineditPost) {
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
                <h3 className="mb-4 text-center">Edit Post</h3>
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
                        <Button variant="primary" type="submit" disabled={isLoading}>
                            {isLoading ? <Spinner size="sm" animation="border" /> : "Update Post"}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default AdminEditPost;
