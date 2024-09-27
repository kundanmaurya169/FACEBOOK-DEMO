import axios from 'axios';

const API_URL = 'http://localhost:8000/api/user';


export const registerUser = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Convert formData to JSON
        });

        // Check if the response is not OK (status not in 200-299 range)
        if (!response.ok) {
            const errorData = await response.json(); // Parse the error response
            throw new Error(errorData.message || 'Failed to register user');
        }

        const data = await response.json(); // Parse the JSON response data
        console.log({ data });

        return data; // Return the response data
    } catch (error) {
        console.error('Error:', error.message || 'Something went wrong');
        throw error; // Rethrow the error for handling in the component
    }
};

export const loginUser = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true //true
        });
        return response.data; // Return the response data
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        throw error; // Rethrow the error for handling in the component
    }
};




export const fetchUserInfo = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`, {
            withCredentials: true, // Allows cookies to be sent with the request
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Check if response status is OK
        if (response.status === 200) {
            const data = response.data;
            console.log(data);
            return data; // Return user info
        } else {
            console.error('Failed to fetch user info:', response.statusText);
            return { error: response.statusText }; // Return error message
        }
    } catch (error) {
        console.error('Failed to fetch user info:', error.message);
        return { error: error.message }; // Return error message
    }
};

export const logout = async () => {
    try {
        console.log("in logout function");
        const response = await axios.get(`${API_URL}/logout`, {
            withCredentials: true, // Ensure cookies are sent with the request
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response; 
    } catch (error) {
        console.error('Error:', error.message || 'Something went wrong');
        throw error; // Optionally rethrow the error for further handling
    }
};
// Api for update profile
export const updateUserProfile = async (profileData) => {
    try {
        const response = await axios.put(`${API_URL}/profile`, profileData, {
            withCredentials: true, // Allows cookies to be sent with the request
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data; // Return the response from the server
    } catch (error) {
        console.error('Failed to update profile:', error.message);
        throw error; // Rethrow the error for handling in the component
    }
};







