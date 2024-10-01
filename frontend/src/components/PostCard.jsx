/* eslint-disable react/prop-types */





    const PostCard = ({ post }) => {
      return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              {/* <img src={post.user.profilePicture} alt={post.user.name} className="h-8 w-8 rounded-full mr-2" /> */}
              <span className="text-lg font-bold">{post?.userId?.name}</span>
            </div>
            <div className="text-gray-600 text-sm">{post?.createdAt}</div>
          </div>
          <div className="text-lg mb-2">{post?.title}</div>
          <div className="text-lg mb-2">{post?.content}</div>
          {post.image && (
            <img  src={`http://localhost:8000/${post.image}`} className="w-full h-64 object-cover mb-2" />
          )}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded">
                Like
              </button>
              <button className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded">
                Comment
              </button>
            </div>
            <div className="text-gray-600 text-sm">{post.likes} likes</div>
          </div>
        </div>
      );
    };
    
    export default PostCard;
