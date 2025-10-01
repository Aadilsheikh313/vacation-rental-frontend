import { useEffect } from "react";
import styles from "../stylesModule/UserProfile/userProfile.module.css"
import { useDispatch, useSelector } from "react-redux";
import { profilereset } from "../config/redux/reducer/userReducer";
import { userProfileAction } from "../config/redux/action/userAction";
import CustomSpinner from "../comman/Spinner";



const UserProfile = () => {
    const dispatch = useDispatch();

    const { userProfile: user, isLoading, isError, isSuccess, message } = useSelector((state) => state.userProfile);
    const { token } = useSelector((state) => state.auth);

    const tokenObj = { token };

    useEffect(() => {
        if (tokenObj.token) {
            dispatch(userProfileAction(tokenObj));
        }

        return () => {
            dispatch(profilereset());
        }
    }, [dispatch, token]);

    return (
        <div className={styles.profileContainer}>
            <h2>👤 User Profile</h2>
            {isLoading ? (
                <CustomSpinner />
            ) : <>
                {isError && <p style={{ color: 'red' }}>Error: {message}</p>}
                {isSuccess && user && (
                    <div>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Registered On:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                )}
                {!isLoading && !isError && !isSuccess && <p>No profile data available.</p>}
                <button>Update Profile</button>
            </>
            }

        </div>

    )
}
export default UserProfile