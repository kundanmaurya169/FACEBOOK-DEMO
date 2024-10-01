// src/api/postApi.js
import axios from 'axios';


const API_URL = 'http://localhost:8000/api/post/'; // Base URL for the posts API

// Function to create a post
export const createPost = async (formData) => {
    const token = localStorage.getItem('token');
    console.log('from frontend send token',token);
    console.log("send data ;- ", formData);
    // for (let pair of formData.entries()) {
    //     console.log(`${pair[0]}: ${pair[1]}`);
    // }
    try {
        const response = await axios.post(`${API_URL}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` ,
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
    try {
        const response = await axios.get(`${API_URL}`, {
            withCredentials: true, // Include cookies if necessary
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

