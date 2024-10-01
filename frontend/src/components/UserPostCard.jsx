/* eslint-disable react/prop-types */

import { deletePost } from '../api/postApi'; // Adjust the import path as necessary

const UserPostCard = ({ post, onDelete }) => {
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost(post._id); // Call the delete function with the post ID
                onDelete(post._id); // Notify the parent to update the state
            } catch (error) {
                alert('Failed to delete the post.');
                console.log(error)
            }
        }
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-200 m-4 relative">
            {/* Delete button positioned in the upper right corner */}
            <button
                onClick={handleDelete}
                className="absolute top-2 right-2 bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-700"
            >
                Delete
            </button>
            {/* Image displayed in a row above the content */}
            
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-700">{post.content}</p>
                <p className="text-gray-500 text-sm">
                    Posted by {post?.userId?.name} on {new Date(post.createdAt).toLocaleDateString()}
                </p>
            </div>
            {post.image && (
                <img
                    className="w-full h-48 object-cover"
                    src={`http://localhost:8000/${post.image}`} // Adjust path as necessary
                    alt="Post Image"
                />
            )}
        </div>
    );
};

export default UserPostCard;
