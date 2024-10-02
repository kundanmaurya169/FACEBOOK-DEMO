import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { FaHome, FaUser, FaPlusCircle } from "react-icons/fa"; // Importing icons from react-icons

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      {/* Title */}
      <h1 className="text-2xl font-bold bg-slate-500 mb-4 text-center text-white py-2 rounded">
        Facebook Demo
      </h1>
      
      {/* Navigation Links */}
      <ul className="space-y-4">
        <li className="flex items-center">
          <FaHome className="text-blue-600 mr-2" /> {/* Home Icon */}
          <Link to="/feed" className="text-blue-600 hover:underline">Feed</Link>
        </li>
        <li className="flex items-center">
          <FaUser className="text-blue-600 mr-2" /> {/* Profile Icon */}
          <Link to="/profile" className="text-blue-600 hover:underline">Profile</Link>
        </li>
        <li className="flex items-center">
          <FaPlusCircle className="text-blue-600 mr-2" /> {/* Create Post Icon */}
          <Link to="/createpost" className="text-blue-600 hover:underline">Create Post</Link>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
