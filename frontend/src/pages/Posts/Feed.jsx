import { useState, useEffect } from 'react';
import { fetchPosts } from '../../api/postApi.js'; 
import { likePost, unlikePost } from '../../api/likeApi.js';
import { addComment, deleteComment } from '../../api/commentApi.js';
import PostCard from '../../components/PostCard.jsx';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshPosts = async () => {
    try {
      const post = await fetchPosts();
      setPosts(post);
    } catch (err) {
      setError(err.message);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPosts(); // Initial fetch on component mount
  }, []);

  const handleLike = async (postId) => {
    try {
      await likePost(postId);
      setPosts(posts.map(post => post._id === postId ? { ...post, likesCount: post.likesCount + 1 } : post));
    } catch (err) {
      console.error("Error liking post: ", err);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      await unlikePost(postId);
      setPosts(posts.map(post => post._id === postId ? { ...post, likesCount: post.likesCount - 1 } : post));
    } catch (err) {
      console.error("Error unliking post: ", err);
    }
  };

  const handleAddComment = async (postId, comment) => {
    try {
      // Call addComment, which returns the parsed response data directly
      const newComment = await addComment(postId, comment);
  
      // Update the posts state by adding the new comment to the relevant post
      setPosts(posts.map(post => 
        post._id === postId 
          ? { ...post, comments: [...post.comments, newComment] } 
          : post
      ));
    } catch (err) {
      console.error("Error adding comment: ", err);
    }
  };

  const handleDeleteComment = async (commentId, postId) => {
    try {
      await deleteComment(commentId, postId);
      setPosts(posts.map(post => ({
        ...post,
        comments: post.comments.filter(comment => comment._id !== commentId),
      })));
    } catch (err) {
      console.error("Error deleting comment: ", err);
    }
  };

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-6">Error fetching posts: {error}</div>;
  }

  return (
    <div className="bg-gray-100 w-full">
      <h1 className="text-2xl font-bold bg-slate-500 mb-4 text-center">Feed</h1>
      <div className="container mx-auto p-1 pt-3 md:p-6 lg:p-12">
        {posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            onLike={handleLike}
            onUnlike={handleUnlike}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
            refreshPosts={refreshPosts}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
