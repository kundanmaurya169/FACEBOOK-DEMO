/* eslint-disable react/prop-types */


import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
    {/* Left Side Navbar */}
    <div className="w-1/4 bg-gray-200 p-4">
      <Navbar />
    </div>

    {/* Right Side Feed */}
    <div className="w-3/4 bg-white p-4 overflow-auto">
      {children}
    </div>
  </div>
  );
};

export default MainLayout;
