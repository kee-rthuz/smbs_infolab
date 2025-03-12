import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-around p-4 bg-gray-800 text-white">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/explore" className="hover:underline">Explore</Link>
      <Link to="/upload" className="hover:underline">Upload</Link>
      <Link to="/profile" className="hover:underline">Profile</Link>
    </nav>
  );
};

export default Navbar;
