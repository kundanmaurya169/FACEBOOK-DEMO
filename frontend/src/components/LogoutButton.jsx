// LogoutButton.jsx
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/userApi';

const LogoutButton = () => {
    const navigate = useNavigate();


        const handleLogout = async () => {
            try {
                await logout(); // Call the logout function
                const token=localStorage.removeItem('token');
                alert('Logout',token)
                navigate('/'); // Redirect to the login page
            } catch (error) {
                console.error('Logout failed:', error);
                alert('Logout failed. Please try again.'); // Display a user-friendly message
            }
        };
        

    return (
        <button 
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition">
            Logout
        </button>
    );
};

export default LogoutButton;
