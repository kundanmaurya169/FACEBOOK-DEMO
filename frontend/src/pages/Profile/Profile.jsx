import { useEffect, useState } from 'react';
import { fetchUserInfo, updateUserProfile } from '../../api/userApi'; // Import API functions
import ProfileModal from './UpdateProfileModel'; // Import the ProfileModal component
import MyPost from '../Posts/MyPost'; // Import MyPost component

const UserProfile = () => {
  const [user, setUser] = useState(null); // State to hold user info
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // For controlling popup visibility
  const [popupMessage, setPopupMessage] = useState(''); // Message to display in the popup

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

    if (result.message) {
      // Update local user state with the new data
      setUser({ ...user, ...updatedData }); // Merge updated data with existing user data
      setUpdateTrigger((prev) => !prev);
      setIsModalOpen(false); // Close the modal after updating
      // Show success popup
      setPopupMessage('Profile updated successfully!'); // Set success message
      setIsPopupVisible(true); // Show the popup
    } else {
      console.error("Update failed:", result.message); // Log error message
      setError(result?.message || "An error occurred while updating the profile.");

      // Show error popup
      setPopupMessage(result?.message || "An error occurred while updating the profile."); // Set error message
      setIsPopupVisible(true); // Show the popup
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      console.log('useEffect triggered:', updateTrigger);
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
  }, [updateTrigger]); // Run only once on component mount

  if (loading) {
    return <div className="text-center py-4">Loading...</div>; // Display loading state
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>; // Display error message
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mb-6 relative shadow-md">
        {isPopupVisible && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded shadow-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none text-2xl"
                onClick={() => setIsPopupVisible(false)} // Close the popup
              >
                &times; {/* This represents a cross (X) sign */}
              </button>
              <p className="mt-8 text-lg">{popupMessage}</p>
            </div>
          </div>
        )}
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
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">My Profile</h2>
        <button
          onClick={handleUpdateProfileClick}
          className="absolute top-4 right-4 w-28 bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-300 transition duration-200"
        >
          Edit Profile
        </button>
        <div className="space-y-4 mt-6">
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
      </div>
      
      <hr className="my-6" />
      {/* Lower Part: User Posts */}
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-black-800 text-center mb-4">My Posts</h2>
        <MyPost userId={user._id} />
      </div>
    </>
  );
};

export default UserProfile;
