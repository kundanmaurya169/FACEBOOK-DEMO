import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLoginHandler } from './formHandlers';

const Login = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });

  const [loading, setLoading] = useState(false); // For handling the loading state
  const [error, setError] = useState(''); // For handling any error during login

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = useLoginHandler(formData, setLoading, setError);

  return (
    <div className="flex items-center justify-between h-screen bg-gray-100 p-3">
      <div className="flex flex-col ml-3 md:flex-row items-center space-x-8 w-full max-w-4xl">
        {/* Left Section - Logo and Text */}
        <div className="w-4 text-center md:text-left md:flex-1 ml-4 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold text-blue-600">Facebook Demo</h1>
          <p className="text-lg text-gray-600 mt-4">
            Facebook demo helps you connect and share <br /> with the people in your life.
          </p>
        </div>

        {/* Right Section - Login Form */}
        <div className="bg-gray-100 p-2 rounded-lg justify-center w-{100px} md:w-80">
          <h1 className="text-2xl font-bold mb-6 text-center">Welcome to Login Page</h1>

          <form onSubmit={handleSubmit} className="bg-gray-100 rounded-lg p-1">
            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">
                {error}
              </p>
            )}

            <div className="mb-4">
              <label className="block text-sm pb-1 font-medium text-gray-700" htmlFor="login">
                Login
              </label>
              <input
                type="text"
                name="login"
                value={formData.login}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm pb-1 font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className={`w-{80px} py-1 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-all duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <hr className="my-3" />

          <Link to="/register">
            <button className="w-{150px} p-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-all duration-200">
              Create new account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
