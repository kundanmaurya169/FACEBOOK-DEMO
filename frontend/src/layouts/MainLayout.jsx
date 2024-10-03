/* eslint-disable react/prop-types */

import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Left Side Navbar */}
            <div className="w-1/4 bg-gray-100 text-white p-4 shadow-lg">
                <Navbar />
            </div>

            {/* Right Side Feed */}
            <div className="w-3/4 bg-gray-100 p-6 overflow-y-auto shadow-md flex flex-col">
                {/* Main Content Area */}
                <div className="max-w-4xl mx-auto flex-grow">
                    {children}
                </div>

                {/* Footer Section */}
                <div className="border-t border-gray-200 mt-4 pt-4 text-center text-gray-600">
                    <p className="text-sm">© {new Date().getFullYear()} Facebook Clone</p>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
