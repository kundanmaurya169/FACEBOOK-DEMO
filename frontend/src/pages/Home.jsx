import { Link } from 'react-router-dom';
import Homeimage from '../assets/homeimage.jpg';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Facebook</div>
          <div>
            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mr-4 transition-all duration-200">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <div className="flex flex-col items-center justify-center flex-grow bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Facebook</h1>
          <p className="text-gray-700 mb-6 text-center">
            Connect with friends and the world around you on Facebook.
          </p>
          <img
            src={Homeimage}
            alt="Social Media"
            className="rounded-lg mt-4 max-w-full h-auto shadow-lg" 
          />
          <p className="text-gray-700 mt-6 text-center">
            Share your thoughts, photos, and updates with your friends and family.
          </p>

          {/* Call to Action Section */}
          <div className="mt-8 text-center">
            <Link to="/login">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                Explore More
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-white shadow-md mt-10">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-gray-600">
          <p className="text-sm">© {new Date().getFullYear()} Facebook Demo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
