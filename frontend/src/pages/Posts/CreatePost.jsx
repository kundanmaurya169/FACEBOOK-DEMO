import  { useState } from 'react';
import {createPost} from '../../api/postApi'

const PostCard = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // Store the file object for Axios
            setError(''); // Reset error on input change
        }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(''); // Clear previous error
      setSuccess(''); // Clear previous success message
  
      // Validate form fields
      if (!title || !content || !image) {
          setError('Please fill in all fields and upload an image.');
          return;
      }
  
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', image);
  
      try {
          const result = await createPost(formData); // Call the createPost function
          setSuccess('Post created successfully!'); // Set success message
          console.log('Post submitted:', result); // Log the created post data
          
          // Reset the form after successful submission
          setTitle('');
          setContent('');
          setImage(null);
      } catch (error) {
          setError(error.response ? error.response.data.error : 'Failed to create post'); // Set error message
      }
  };
  

    return (
        <div className="post-card border p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-2">Create Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Post Title"
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Post Content"
                        className="border p-2 w-full rounded"
                        rows="4"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border p-2 w-full rounded"
                        required
                    />
                    {image && (
                        <img
                            src={URL.createObjectURL(image)} // Preview the image
                            alt="Preview"
                            className="mt-2 w-full h-auto rounded"
                        />
                    )}
                </div>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Submit Post
                </button>
            </form>
        </div>
    );
};
export default PostCard;
