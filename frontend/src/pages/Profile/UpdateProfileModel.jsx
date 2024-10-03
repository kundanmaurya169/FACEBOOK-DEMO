/* eslint-disable react/prop-types */


const ProfileModal = ({ isOpen, onClose, onUpdate, updatedName, setUpdatedName, updatedEmail, setUpdatedEmail, updatedPhone, setUpdatedPhone }) => {
  if (!isOpen) return null; // Return null if the modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Phone:
          <input
            type="tel"
            value={updatedPhone}
            onChange={(e) => setUpdatedPhone(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </label>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 text-black font-semibold py-2 px-4 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
            onClick={onUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
