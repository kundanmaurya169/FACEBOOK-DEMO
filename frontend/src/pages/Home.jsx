import { Link } from 'react-router-dom';
import Homeimage from '../assets/homeimage.jpg'

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600">Facebook</div>
          <div>
            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mr-4">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content Section */}
      <div className=" max-w-6xl mx-auto mt-10 px-4">
        <div className=" flex flex-col items-center justify-center flex-grow  bg-white  p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">Welcome to Facebook</h1>
          <p className="text-gray-700 mb-4">
            Connect with friends and the world around you on Facebook.
          </p>
          <img
            src={Homeimage}
            alt="Social Media"
            className="rounded-lg mt-4" 
          />
          <p className="text-gray-700 mt-4">
            Share your thoughts, photos, and updates with your friends and family.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
