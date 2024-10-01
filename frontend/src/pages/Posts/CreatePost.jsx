import { useState } from "react";
import { createPost } from "../../api/postApi";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPEG, PNG, GIF).");
        setImage(null);
        return;
      }

      setImage(file);
      setError(""); // Reset error on input change
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError(""); // Clear previous error
      setSuccess(""); // Clear previous success message

      // Validate form fields
      if (!title || !content || !image) {
        setError("Please fill in all fields and upload an image.");
        return;
      }
      console.log(title, content, "image ;- ", image);

      const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
        formData.append('image', image);
    }

    // Log FormData contents
    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }

      console.log("Post submitted:", formData); // Log the created post data
      const result = await createPost(formData); // Call the createPost function
      setSuccess("Post created successfully!"); // Set success message

      // Reset the form after successful submission
      setTitle("");
      setContent("");
      setImage(null);

      // Navigate to the feed after successful post creation
      navigate("/feed"); // Change '/feed' to your actual feed route
      return result;
    } catch (error) {
      setError(
        error.response ? error.response.data.error : "Failed to create post"
      ); // Set error message
    }
  };

  return (
    <div className="post-card border border-gray-300 rounded-lg shadow-md p-4 max-w-md w-full">
      <h2 className="text-lg font-bold mb-2">Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Post Content"
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {image && (
            <img
              src={URL.createObjectURL(image)} // Preview the image
              alt="Preview"
              className="mt-2 w-full h-48 object-cover rounded"
            />
          )}
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
