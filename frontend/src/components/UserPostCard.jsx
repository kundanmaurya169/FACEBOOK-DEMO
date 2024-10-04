/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { deletePost, updatePost } from "../api/postApi"; // Adjust the import path as necessary
import { deleteComment } from "../api/commentApi"; // Import comment functions
import { AiFillLike,AiOutlineComment } from 'react-icons/ai';

const UserPostCard = ({ post, onDelete, onUpdate }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [updatedContent, setUpdatedContent] = useState(post.content);
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);
  

  console.log("no of likes :-",post.likes.length)

  // Reference to the menu
  const menuRef = useRef(null);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(post._id);
        onDelete(post._id);
      } catch (error) {
        alert("Failed to delete the post.");
        console.log(error);
      }
    }
  };

  const handleUpdate = async () => {
    const updatedPost = {
      title: updatedTitle,
      content: updatedContent,
    };

    try {
      await updatePost(post._id, updatedPost);
      onUpdate(); 
      setIsEditing(false);
    } catch (error) {
      console.log("Failed to update the post.");
      console.log(error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await deleteComment(commentId, post._id);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.log("Failed to delete comment.");
      console.error(error);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg p-6 mb-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{post?.title}</h2>
        <button
          onClick={toggleMenu}
          className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Edit Post
        </button>
        {showMenu && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10"
          >
            <button
              onClick={handleDelete}
              className="block px-4 py-2 text-red-600 hover:bg-gray-200 w-full text-left"
            >
              Delete
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="block px-4 py-2 text-blue-600 hover:bg-gray-200 w-full text-left"
            >
              Update
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mb-4">
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="border border-gray-300 rounded w-full mb-2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Post Title"
          />
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            className="border border-gray-300 rounded w-full mb-2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Post Content"
            rows={3}
            style={{ resize: "vertical" }}
          />
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white font-bold py-1 px-4 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-800 font-bold py-1 px-4 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-lg mb-2 text-gray-700">{post?.content}</div>
          {post.image && post.image !== "" && (
            <img
              src={`http://localhost:8000/${post.image}`}
              className="w-full h-48 object-cover mb-4 rounded-lg shadow-sm"
              alt="Post"
            />
          )}
          <div className="text-sm text-gray-500 mb-2">
            Posted on {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      )}
      
      {/* Like and Comment Section */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <AiFillLike size={24} />
          <span className="text-gray-600">({post?.likes?.length || 0}) Likes</span>
        </div>
        {/* Comment Button */}
        <button
          onClick={toggleComments}
          className="flex items-center text-gray-600 px-2 py-1 rounded hover:bg-gray-200"
        >
          <AiOutlineComment className="mr-1" size={24} />
          <span>({comments.length}) Comments</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 border-t border-gray-300 pt-2">
          {comments.map((comment) => (
            <div
              key={comment?._id}
              className="flex justify-between items-center py-2"
            >
              <span className="text-sm text-gray-500">
                {comment?.userId?.name}:
              </span>
              <div className="flex items-center">
                <span>{comment.content}</span>
                <button
                  onClick={() => handleCommentDelete(comment?._id)}
                  className="text-red-300 ml-2 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPostCard;
