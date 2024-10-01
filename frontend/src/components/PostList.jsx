/* eslint-disable react/prop-types */
import PostCard from './PostCard'; // Adjust the path based on your file structure

const PostList = ({ posts }) => {
    return (
        <div className="flex flex-wrap justify-center ">
          {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className="w-full max-w-lg mb-4"> {/* Limit the width of each post and add bottom margin */}
                        <PostCard post={post} />
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No posts available</p>
            )}
        </div>
    );
};

export default PostList;