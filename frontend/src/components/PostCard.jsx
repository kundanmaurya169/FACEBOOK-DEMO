/* eslint-disable react/prop-types */


const PostCard = ({ post }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-200 m-4">
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-700">{post.content}</p>
                <p className="text-gray-500 text-sm">
                    {/* Uncomment if you want to show user details */}
                    {/* Posted by {post.userId.name} ({post.email}) on {new Date(post.createdAt).toLocaleDateString()} */}
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

export default PostCard;
