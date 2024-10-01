import { Link } from 'react-router-dom';
import Button    from '../../components/Button.jsx'
import { useState } from 'react';
import {useLoginHandler} from './formHandlers'
const Login = () => {

  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
    // handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // handle submit
   const handleSubmit = useLoginHandler(formData);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to Login Page</h1>
        
        <form onSubmit={handleSubmit} className="bg-white  rounded-lg p-8 w-75">
        <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                        Login
                    </label>
                    <input
                        type="text"
                        name="login"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Enter email or phone'
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder='Enter your password'
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

          <Button
            type="submit"
          >
            Login
          </Button>
        </form>

        <p className="mt-4 text-center">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register 
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
