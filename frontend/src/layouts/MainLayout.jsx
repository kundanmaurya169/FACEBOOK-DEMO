/* eslint-disable react/prop-types */


import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side Navbar */}
      <div className="w-1/4 bg-gray-900 text-white p-4 shadow-lg">
        <Navbar />
      </div>

      {/* Right Side Feed */}
      <div className="w-3/4 bg-white p-6 overflow-y-auto shadow-md flex flex-col">
                <div className="max-w-4xl mx-auto flex-grow">
                    {children}
                </div>
            </div>
    </div>
  );
};

export default MainLayout;
