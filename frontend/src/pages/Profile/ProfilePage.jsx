
import Profile from './Profile';
// import UserPosts from './UserPosts';

const ProfilePage = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Upper Part: Profile Details */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <Profile />
      </div>
    </div>
  );
};

export default ProfilePage;
