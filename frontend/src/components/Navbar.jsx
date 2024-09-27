import { Link } from "react-router-dom"
import LogoutButton from "./LogoutButton"



const Navbar = () => {
  return (
    <nav>
      <ul className="space-y-4">
        <li>
          <Link to="/feed" className="text-blue-600 hover:underline">Feed</Link>
        </li>
        <li>
          <Link to="/profile" className="text-blue-600 hover:underline">Profile</Link>
        </li>
        <li>
          <Link to="/settings" className="text-blue-600 hover:underline">Settings</Link>
        </li>
        <li>
          <LogoutButton/>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

