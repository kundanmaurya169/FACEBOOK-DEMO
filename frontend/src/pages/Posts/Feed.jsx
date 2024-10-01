import  { useState, useEffect } from 'react';
import { fetchPosts } from '../../api/postApi.js'; 
import PostList from '../../components/PostList.jsx';
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
      const getPosts = async () => {
          try {
              const post = await fetchPosts(); // Fetch posts
              setPosts(post); // Update state with fetched posts
              console.log('post', post)
          } catch (err) {
              setError(err.message); // Set error message if there's an error
          } finally {
              setLoading(false); // Set loading to false after fetching
          }
      };

      getPosts(); // Call the function to fetch posts
  }, [loading]);

  if (loading) {
      return <div>Loading...</div>; // Display loading state
  }

  if (error) {
      return <div>Error fetching posts: {error}</div>; // Display error message
  }

return (
    <div className="bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold bg-slate-500 mb-4 text-center">Feed</h1>
        <div className="flex flex-wrap justify-center">
        <PostList posts={posts} />
            
        </div>
    </div>
);
};

export default Feed
