import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";


const UserProfile = () => {

    const dispatch = useDispatch();
    const { user, isLoading, isError, message } = useSelector((state) => state.auth);

    useEffect(() => {       
        const token = localStorage.getItem('token');
        axios.get('http://localhost:4000/api/auth/getUser', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                // Handle response
            })
            .catch(error => {
                // Handle error
            });

    }, [dispatch]);

    if (isLoading) {
        return <p>Loading profile...</p>

    }
    if (isError) {
        return <p>Error: {typeof message === 'string' ? message : JSON.stringify(message)}</p>
    }

    if (!user) {
        return <p>No user data available</p>
    }
    return (
        <div style={{ padding: "20px", border: "1px solid gray", borderRadius: "10px" }}>
            <h2>👤 User Profile</h2>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>

        </div>
    )
}
export default UserProfile