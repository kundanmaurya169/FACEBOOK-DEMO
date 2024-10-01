import { deletePost } from "../../api/postApi";

export const handleDelete = async (postId) => {
    try {
        const result = await deletePost(postId);
        console.log('Post deleted successfully:', result);
        return result;
        // Optionally, refresh the posts or update the state to remove the deleted post from the UI
    } catch (error) {
        console.error('Failed to delete post:', error);
        // Handle the error appropriately (e.g., show an error message to the user)
    }
};

