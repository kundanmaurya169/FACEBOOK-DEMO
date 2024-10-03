
import Profile from './Profile';
// import UserPosts from './UserPosts';

const ProfilePage = () => {
  return (
    <div className="container bg-gray-100 mx-auto p-4">
      {/* Upper Part: Profile Details */}
      <div className="bg-white-100 rounded-lg p-6 mb-6">
        <Profile />
      </div>
    </div>
  );
};

export default ProfilePage;
