import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Spinner, Alert, Button } from "react-bootstrap";
import { getAllPostAdmin } from "../../config/redux/action/adminPostAction";
import { resetStatus } from "../../config/redux/reducer/adminPostReducer";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const categories = [
    "All",
    "Natural",
    "Cultural",
    "Urban",
    "Theme Park",
    "Wellness & Spiritual",
    "Adventure Sports",
    "Culinary",
    "Offbeat & Remote"
];

const GetAllAdminPosts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("All");

    const {
        allAdminPosts,
        isLoading,
        isError,
        message,
        totalPosts,
    } = useSelector((state) => state.adminPost);

    useEffect(() => {
        dispatch(getAllPostAdmin(selectedCategory));

        return () => {
            dispatch(resetStatus());
        };
    }, [dispatch, selectedCategory]);

    return (
        <Container className="mt-5">
            <Card>
                {totalPosts > 0 && (
                    <p className="text-center mt-3"> <b>Total Posts:</b>  {totalPosts}</p>
                )}
            </Card>


            {/* Filter Buttons */}
            <div className="mb-4 text-center">
                {categories.map((cat) => (
                    <Button
                        key={cat}
                        variant={selectedCategory === cat ? "primary" : "outline-primary"}
                        className="m-1"
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </Button>
                ))}
            </div>

            {isLoading && (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading all posts...</p>
                </div>
            )}

            {isError && (
                <Alert variant="danger" className="text-center">
                    {message}
                </Alert>
            )}

            {!isLoading && !isError && allAdminPosts.length === 0 && (
                <Alert variant="info" className="text-center">
                    No posts available.
                </Alert>
            )}

            <Row>
                {allAdminPosts.map((post) => (
                    <Col md={6} lg={4} key={post._id} className="mb-4">
                        <Card className="shadow-sm">
                            {post.images && post.images.length > 0 && (
                                <Card.Img
                                    variant="top"
                                    src={post.images[0].url}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                            )}
                            <Card.Body>
                                <Card.Title>{post.title || "Untitled Post"}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {post.category} | Posted On: {new Date(post.postedOn).toLocaleDateString()}
                                    <br />
                                    {post.subcategory}
                                </Card.Subtitle>
                                <Card.Text>{post.description.slice(0, 100) + "..."}</Card.Text>
                                <p><strong>City:</strong> {post.city}</p>
                                <p><strong>Location:</strong>{post.location}</p>
                                <p><strong>Country:</strong> {post.country}</p>
                            </Card.Body>
                            <Button onClick={() => navigate(`/admin/post/${post._id}`)}>
                                <FaEye /> View
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>


        </Container>
    );
};

export default GetAllAdminPosts;
