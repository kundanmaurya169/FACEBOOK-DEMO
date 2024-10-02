/* eslint-disable react/prop-types */
import { useState } from 'react';

const PostCard = ({ post, onLike, onUnlike, onAddComment, onDeleteComment }) => {
    const [isLiked, setIsLiked] = useState(post.isLiked || false);
    const [likeCount, setLikeCount] = useState(post.likesCount || 0);
    const [unlikeCount, setUnLikeCount] = useState(post.dislikesCount || 0);
    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState(post.comments || []);

    const handleLikeUnlike = async (action) => {
        try {
            if (action === 'like' && !isLiked) {
                await onLike(post._id); // Call the like API
                setLikeCount((prevCount) => prevCount + 1); // Increment the like count
                setIsLiked(true); // Mark as liked
                if (unlikeCount > 0) {
                    setUnLikeCount((prevCount) => prevCount - 1); // Decrement unlike count if it exists
                }
            } else if (action === 'unlike' && isLiked) {
                await onUnlike(post._id); // Call the unlike API
                setLikeCount((prevCount) => prevCount - 1); // Decrement the like count
                setIsLiked(false); // Mark as unliked
                setUnLikeCount((prevCount) => prevCount + 1); // Increment unlike count
            }
        } catch (error) {
            alert('Failed to update like/unlike status.');
            console.error(error);
        }
    };
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (commentInput.trim()) {
            try {
                console.log("post id :-", post._id);
                console.log("commentContent :- ",commentInput);
                const newComment = await onAddComment(post._id, commentInput);
                setComments([...comments, newComment]); // Add the new comment to the local state
                setCommentInput(''); // Clear the input field
            } catch (error) {
                alert('Failed to add comment.');
                console.error(error);
            }
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await onDeleteComment(commentId, post._id);
            setComments(comments.filter((comment) => comment._id !== commentId)); // Remove the deleted comment from the state
        } catch (error) {
            alert('Failed to delete comment.');
            console.error(error);
        }
    };
    if (!post) {
        return <div>Loading...</div>; // Or any placeholder/loading UI
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="text-lg text-black-500">
                <h3>Posted by: {post?.userId?.name}</h3>
            </div>
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p className="text-gray-700">{post.content}</p>
            {post.image && (
                <img
                    src={`http://localhost:8000/${post.image}`}
                    className="w-full h-64 object-cover mb-2"
                    alt="Post"
                />
            )}
            <div className="mt-4 flex items-center">
                <button
                    onClick={() => handleLikeUnlike('like')}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                    Like<span className="ml-2">{likeCount}</span>
                </button>
                <button
                    onClick={() => handleLikeUnlike('unlike')}

                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                >
                    Unlike <span className="ml-2">{unlikeCount}</span>
                </button>
            </div>
            <div className="mt-4">
                <h3 className="text-md font-semibold">Comments:</h3>
                {comments?.length > 0 ? (
                    comments.map((comment) => (
                        <div
                            key={comment?._id}
                            className="bg-gray-100 p-2 rounded mt-2 flex justify-between items-center"
                        >
                            <div>
                                <p className="text-sm">{comment?.content}</p>
                                <span className="text-xs text-gray-500">
                                    Commented by: {comment?.userId?.name} 
                                </span>
                            </div>
                            <button
                                onClick={() => handleDeleteComment(comment?._id)}
                                className="text-red-500 hover:text-red-700 ml-2"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No comments yet.</p>
                )}
                <form onSubmit={handleCommentSubmit} className="mt-2 flex">
                    <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Add a comment..."
                        className="border rounded px-2 py-1 flex-grow"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded ml-2">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};



export default PostCard;
