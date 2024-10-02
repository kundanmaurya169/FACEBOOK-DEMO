import axios from 'axios';

const API_URL = 'http://localhost:8000/api/like'; // Adjust this URL as needed

// Like a post
export const likePost = async (postId) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    try {
        const response = await axios.post(`${API_URL}/${postId}/like`,{}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data; // If the backend sends a response, you can handle it
    } catch (error) {
        if (error.response) {
            // Server responded with a status outside the 2xx range
            console.error('Error response from server:', error.response.data);
            console.error('Status code:', error.response.status); // You can check if it's 400
            throw new Error(error.response.data.message || 'Failed to like post');
        } else if (error.request) {
            // No response received from the server
            console.error('No response received:', error.request);
            throw new Error('No response from server. Please try again.');
        } else {
            // Any other errors
            console.error('Error liking post:', error.message);
            throw new Error('Failed to like post');
        }
    }
};

// Unlike a post
export const unlikePost = async (postId) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    try {
        await axios.post(`${API_URL}/${postId}/unlike`,{}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
    } catch (error) {
        console.error('Error unliking post:', error);
        throw new Error('Failed to unlike post');
    }
};
