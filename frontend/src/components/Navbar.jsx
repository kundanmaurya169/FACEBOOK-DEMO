import { Link } from "react-router-dom"
import LogoutButton from "./LogoutButton"

const Navbar = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/feed">Feed</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
          <LogoutButton/>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
