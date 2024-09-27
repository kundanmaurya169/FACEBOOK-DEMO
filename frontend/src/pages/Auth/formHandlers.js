// Correct use of hooks in a custom hook
import { useNavigate } from 'react-router-dom';
import {registerUser, loginUser} from '../../api/userApi'

export const useRegistrationHandler = (formData) => {
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data on Submit:', formData);
        try {
            const response = await registerUser(formData);
            alert('Registration successful! Please log in.');
            console.log('User registered successfully:', response);
            navigate('/login'); // Using navigate inside the function
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return handleSubmit;
};

export const useLoginHandler = (formData) => {
    const navigate = useNavigate();
        
    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            console.log('Full response:', response); // Log the entire response object
            if (response.token) {
                console.log(response.token);
                const token = JSON.stringify(response.token);
                // Optionally store the token in localStorage or set a cookie here
                localStorage.setItem('token', token);
                alert('Login successful!');
                navigate('/feed'); // Navigate to feed
            } else {
                alert('Login failed. Please try again.'); // Handle login failure
            }// Navigate to feed
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    return handleSubmit; 
};