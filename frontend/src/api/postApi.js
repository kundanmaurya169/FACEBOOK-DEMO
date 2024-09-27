// src/api/postApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/post/'; // Base URL for the posts API

// Function to create a post
export const createPost = async (formData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(`${API_URL}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response) {
            return { success: false, error: error.response.data.error || 'Failed to create post' };
        } else {
            return { success: false, error: 'An error occurred while creating the post' };
        }
    }
};
