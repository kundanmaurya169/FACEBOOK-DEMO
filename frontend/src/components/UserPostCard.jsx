/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { deletePost, updatePost } from "../api/postApi"; // Adjust the import path as necessary
import { deleteComment } from "../api/commentApi"; // Import comment functions
import { FaComment } from "react-icons/fa"; // Import an icon for comments

const UserPostCard = ({ post, onDelete, onUpdate }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [updatedContent, setUpdatedContent] = useState(post.content);
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);

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
      alert("Failed to update the post.");
      console.log(error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await deleteComment(commentId, post._id);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      alert("Failed to delete comment.");
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
    <div className="bg-white rounded-lg p-4 mb-4 max-w-md mx-auto relative">
      <div className="flex justify-between items-center mb-2 relative">
        <button
          onClick={toggleMenu}
          className="absolute top-2 right-2 w-24  bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-300 transition duration-200"
        >
          Edit Post
        </button>
        {showMenu && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10"
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
        <div>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="border rounded w-full mb-2 p-2"
            placeholder="Post Title"
          />
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            className="border rounded w-full mb-2 p-2"
            placeholder="Post Content"
            rows={3}
            style={{ resize: "vertical" }}
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white font-bold py-1 px-4 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white font-bold py-1 px-4 rounded hover:bg-gray-700 ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
         
          <div className="text-lg mb-2">{post?.title}</div>
          <div className="text-lg mb-2">{post?.content}</div>
          {post.image && post.image !== "" && (
            <img
              src={`http://localhost:8000/${post.image}`}
              className="w-full h-48 object-cover mb-2 rounded"
              alt="Post"
            />
          )}
          <div className="text-lg font-semibold text-black-500">
          <span className="text-gray-500 text-sm">Posted on {new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <span className="text-gray-600 text-sm mr-4">
            {post?.likes?.length || 0} likes
          </span>
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleComments}
          >
            <FaComment className="text-gray-600 mr-3" />
            <span className="text-gray-600">{comments.length} Comments</span>
          </div>
        </div>
      </div>

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
                  className="text-red-300 ml-2"
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
