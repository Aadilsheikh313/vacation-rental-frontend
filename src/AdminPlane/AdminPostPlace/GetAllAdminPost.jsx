import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Spinner, Alert, Button } from "react-bootstrap";
import { getAllPostAdmin } from "../../config/redux/action/adminPostAction";
import { resetStatus } from "../../config/redux/reducer/adminPostReducer";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "../../adminStylesModule/adminpostgetall.module.css";
import CustomSpinner from "../../comman/Spinner";

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
        <div className={styles.adminPostContainer}>
            <Container className={styles.allAdminPostsconatiner}>
                <Card className={styles.summarycard}>
                    {totalPosts > 0 && (
                        <p> <b>Total Posts:</b>  {totalPosts}</p>
                    )}
                </Card>


                {/* Filter Buttons */}
                {/* Category Filter Buttons */}
                <div className={styles.adminButtonBar}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`${styles.filterBtn} ${selectedCategory === cat ? styles.activeBtn : ""
                                }`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>


                {isLoading && (
                    <div >
                        <CustomSpinner />
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

                <Row className={styles.getAllPostAdminrow}>
                    {allAdminPosts.map((post) => (
                        <Col md={6} lg={4} key={post._id} className={styles.cardcol}>
                            <Card className={styles.adminpostcard}>
                                {post.images && post.images.length > 0 && (
                                    <Card.Img
                                        variant="top"
                                        src={post.images[0].url}
                                        className={styles.postimage}
                                    />
                                )}
                                <Card.Body>
                                    <Card.Title>{post.title || "Untitled Post"}</Card.Title>
                                    <Card.Subtitle className={styles.cardsubtitle}>
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
        </div>
    );
};

export default GetAllAdminPosts;
