import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPropertyAdminPosts } from "../config/redux/action/adminHomeDashAction";
import { resetAdminState } from "../config/redux/reducer/adminHomeDashReducer";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import styles from "../adminStylesModule/adminHome.module.css";

const AdminHome = () => {
  const dispatch = useDispatch();

  const {
    adminProperties,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.adminHomeDash);

  useEffect(() => {
    dispatch(getAllPropertyAdminPosts());
    return () => dispatch(resetAdminState());
  }, [dispatch]);

  return (
    <div className={styles.adminHome}>
      <h2 className={styles.heading}>Admin Dashboard – Properties</h2>

      {/* Loading */}
      {isLoading && <div className={styles.loader}>Loading...</div>}

      {/* Error */}
      {isError && <div className={styles.error}>{message}</div>}

      {/* Empty */}
      {!isLoading && isSuccess && adminProperties.length === 0 && (
        <div className={styles.info}>No properties found</div>
      )}

      {/* Cards */}
      <div className={styles.grid}>
        {adminProperties.map((property) => (
          <div className={styles.card} key={property._id}>
            {property.image?.url && (
              <img
                src={property.image.url}
                alt={property.title}
                className={styles.image}
              />
            )}

            <div className={styles.cardBody}>
              <h3 className={styles.title}>{property.title}</h3>

              <p className={styles.meta}>
                <span>{property.city}, {property.state}</span>
                <span>₹{property.price} / night</span>
              </p>

              {property.totalReviews > 0 ? (
                <p className={styles.rating}>
                  ⭐ {property.avgRating} ({property.totalReviews})
                </p>
              ) : (
                <p className={styles.noRating}>No reviews yet</p>
              )}

              <Link
                to={`/admin/property/${property._id}`}
                className={styles.viewBtn}
              >
                <FaEye /> View Property
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
