import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { resetEditPost } from "../config/redux/reducer/propertyReducer";
import {
  editPropertyPosts,
  getSinglePosts,
} from "../config/redux/action/propertyAction";
import styles from "../stylesModule/edit.module.css";
import { showError, showSuccess } from "../utils/toastUtils";
import {
  FaMapMarkerAlt, FaTag, FaCity, FaGlobe, FaMoneyBillWave, FaFileImage, FaEdit, FaArrowLeft
} from "react-icons/fa";
import AmenitiesEditForm from "../Amenity/AmenitiesEditForm";
import PolicyEditForm from "../Policy/PolicyEditFrom";


const EditProperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { singlePost, isLoading } = useSelector((state) => state.post);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    country: "",
    city: "",
    location: "",
    expired: false,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");




  // Fetch property details
  useEffect(() => {
    dispatch(getSinglePosts(id));
  }, [dispatch, id]);

  // Set form data once property is fetched
  useEffect(() => {
    if (singlePost) {
      setFormData({
        title: singlePost.title || "",
        description: singlePost.description || "",
        price: singlePost.price || "",
        category: singlePost.category || "",
        country: singlePost.country || "",
        city: singlePost.city || "",
        location: singlePost.location || "",
        expired: singlePost.expired || false,
      });
      setPreview(singlePost.image?.url || "");
    }
  }, [singlePost]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      showError("❌  session expired. Please login   again.");
      return navigate("/login");
    }
    const updatedData = {
      ...formData,
      image: image, // can be null if unchanged
    };


    dispatch(editPropertyPosts({ id, updatedData, token }))
      .unwrap()
      .then(() => {
        showSuccess("✅ Property updated successfully!");
        dispatch(resetEditPost());
        navigate("/"); // Or navigate(`/property/${id}`)
      })
      .catch((error) => {
        console.error("Edit failed:", error);
        showError("❌ Failed to update property.");
      });
  };

  return (
    <div
      className={styles.editContainer}
      style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}
    >
      <h2>Edit Property</h2>
      {isLoading && <p>Loading property details...</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label><FaTag className="me-2" /> Title</label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <label><FaMoneyBillWave /> Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <label><FaGlobe /> Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          required
        />
        <label><FaCity /> City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
        <label><FaMapMarkerAlt /> Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Full Location"
          required
        />


        {preview && (
          <div style={{ margin: "10px 0" }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: "200px",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        <div>
          <label><FaFileImage /> Upload New Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <label>
          Expired:
          <input
            type="checkbox"
            name="expired"
            checked={formData.expired}
            onChange={handleChange}
          />
        </label>

        <button
          type="submit"
          style={{ padding: "10px 20px", marginTop: "10px" }}
        >
          <FaEdit /> Update Property
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={styles.backButton}
        >

          <FaArrowLeft style={{ marginRight: "8px" }} />
          Go Back
        </button>

      </form>
      {/* Amenities Section */}
      <div style={{ marginTop: "30px" }}>
        <h3>🛎️ Manage Amenities</h3>
        <AmenitiesEditForm propertyId={id} />
      </div>
      {/* Policy Section */}
      <div style={{ marginTop: "30px" }}>
        <h3>📜 Manage Policy</h3>
        <PolicyEditForm />
      </div>

    </div>
  );
};

export default EditProperty;
