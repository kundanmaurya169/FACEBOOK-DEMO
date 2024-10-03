/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import UserPostCard from "../../components/UserPostCard";
import { fetchPostsByUserId } from "../../api/postApi"; // Adjust the import path as necessary

const MyPost = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const getPosts = async () => {
    try {
      const data = await fetchPostsByUserId(userId);
      setPosts(data);
    } catch (error) {
      setError("Failed to fetch posts");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPostsByUserId(userId);
        setPosts(data);
      } catch (error) {
        setError("Failed to fetch posts");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  },[userId]);

  

  const handleDelete = (postId) => {
    // Remove the deleted post from the state
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  const handleUpdate = () => {
    // Refetch posts after updating a post
    getPosts();
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold my-4 text-center">My Posts</h2>
      <div className="grid grid-cols-1  mt-4 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <UserPostCard key={post._id} post={post} onDelete={handleDelete} onUpdate={handleUpdate}/>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default MyPost;
