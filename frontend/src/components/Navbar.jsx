import { Link } from "react-router-dom"
import LogoutButton from "./LogoutButton"



const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
    <h1 className="text-2xl font-bold bg-slate-500 mb-4 text-center text-white">Facebook Demo</h1>
    <ul className="space-y-4">
        <li>
            <Link to="/feed" className="text-blue-600 hover:underline">Feed</Link>
        </li>
        <li>
            <Link to="/profile" className="text-blue-600 hover:underline">Profile</Link>
        </li>
        <li>
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

