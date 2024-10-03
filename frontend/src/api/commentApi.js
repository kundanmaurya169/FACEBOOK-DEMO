import axios from 'axios';

const API_URL = 'http://localhost:8000/api/comment'; // Adjust the API URL as necessary

// Add a comment to a post
export const addComment = async (postId, comment) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  try {
    const response = await axios.post(`${API_URL}/post/${postId}/`, comment, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error.response ? error.response.data : error.message);
    throw new Error('Failed to add comment');
  }
};

// Delete comment
export const deleteComment = async (commentId,postId) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const response = await axios.delete(`${API_URL}/post/${postId}/comment/${commentId}`, {
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data; // Return the response data
};