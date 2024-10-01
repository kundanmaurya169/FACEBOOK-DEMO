// src/api/postApi.js
import axios from 'axios';


const API_URL = 'http://localhost:8000/api/post/'; // Base URL for the posts API

// Function to create a post
export const createPost = async (formData) => {
    const token = localStorage.getItem('token');
    console.log('from frontend send token',token);
    console.log("send data ;- ", formData);
    try {
        const response = await axios.post(`${API_URL}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
            timeout: 10000, // Optional: Set a timeout for the request (10 seconds)
        });
        
        const { data } = response; // Destructure response to get data
        return { success: true, data }; // Return success and data
    } catch (error) {
        // Log error for debugging purposes
        console.error("Error creating post:", error);

        // Handle error responses
        if (error.response) {
            return { success: false, error: error.response.data.error || 'Failed to create post' };
        } else {
            return { success: false, error: 'An error occurred while creating the post' };
        }
    }
};
// fetch post
export const fetchPosts = async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(`${API_URL}`, {
            withCredentials: true, // Include cookies if necessary
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};
// delete post by postId
export const deletePost = async (postId) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    try {
        const response = await axios.delete(`${API_URL}${postId}`, {
            withCredentials: true, // Include cookies if necessary
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            },
        });
        return response.data; // Return the response data, which may contain a success message
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

export const fetchPostsByUserId = async (userId) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`, {
            withCredentials: true, // Include cookies if necessary
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            },
        });
        return response.data; // Return the posts data from the response
    } catch (error) {
        console.error('Error fetching posts by user ID:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};
