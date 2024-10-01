import { useEffect, useState } from 'react';
import { fetchUserInfo , updateUserProfile} from '../../api/userApi'; // Import API function for fetching user info
import ProfileModal from './UpdateProfileModel'; // Import the ProfileModal component
import MyPost from '../Posts/MyPost'

const UserProfile = () => {
  const [user, setUser] = useState(null); // State to hold user info
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const handleUpdateProfileClick = () => {
    // Pre-fill the fields with the current user data
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
    setUpdatedPhone(user.phone);
    setIsModalOpen(true); // Open modal when Edit button is clicked
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleUpdateProfile = async () => {
    const updatedData = {
      name: updatedName,
      email: updatedEmail,
      phone: updatedPhone,
    };

    const result = await updateUserProfile(updatedData); // Call the handler

    if (result.success) {
      // Update local user state with the new data
      setUser({ ...user, ...updatedData }); // Merge updated data with existing user data
      setUpdateTrigger((prev) => !prev); 
      setIsModalOpen(false); // Close the modal after updating
    } else {
      setError(result.message); // Show error message
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await fetchUserInfo(); // Call the API to fetch user info
      if (userInfo && userInfo.user) { // Check if user info is received and contains user data
        setUser(userInfo.user); // Extract user data
        setLoading(false);
      } else {
        setError('Failed to fetch user info.');
        setLoading(false);
      }
    };

    getUserInfo(); // Call the function to fetch user info
  }, [updateTrigger]); // Empty dependency array to run only once on component mount


  if (loading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (<>
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">User Profile</h2>
      <div className="space-y-4">
        {/* <div className="flex justify-between">
          <span className="font-medium text-gray-600">UserId:</span>
          <span className="text-gray-800">{user._id}</span>
        </div> */}
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Name:</span>
          <span className="text-gray-800">{user.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Phone:</span>
          <span className="text-gray-800">{user.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Email:</span>
          <span className="text-gray-800">{user.email}</span>
        </div>
      </div>
      <button
        onClick={handleUpdateProfileClick}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
      >
        Edit Profile
      </button>

      {/* Modal for updating profile */}
      <ProfileModal 
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onUpdate={handleUpdateProfile}
        updatedName={updatedName}
        setUpdatedName={setUpdatedName}
        updatedEmail={updatedEmail}
        setUpdatedEmail={setUpdatedEmail}
        updatedPhone={updatedPhone}
        setUpdatedPhone={setUpdatedPhone}
      />
      
    </div>


    <MyPost userId={user._id}/>
    </>
  );
};

export default UserProfile;
