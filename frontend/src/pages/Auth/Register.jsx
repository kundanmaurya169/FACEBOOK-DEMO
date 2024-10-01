import { useState } from 'react';
import { useRegistrationHandler } from './formHandlers';





const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

   

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

     const handleSubmit = useRegistrationHandler(formData); // Use the handler

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit} // Use handleSubmit directly
                className="bg-white p-6 rounded shadow-md w-96"
            >
                <h2 className="text-lg font-bold mb-4">Register</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        required
                        placeholder='Enter your name'
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        required
                        placeholder='Enter your email'
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                        Phone
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={onChange}
                        required
                        placeholder='Enter your phone'
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
                        onChange={onChange}
                        required
                        placeholder='Enter your password'
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
