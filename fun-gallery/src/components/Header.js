import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-4 bg-gray-900 text-white flex justify-between">
      <h1 className="text-2xl font-bold">FunGallery</h1>
      <nav>
        <Link to="/" className="mx-2">Home</Link>
        <Link to="/explore" className="mx-2">Explore</Link>
        <Link to="/upload" className="mx-2">Upload</Link>
        <Link to="/profile" className="mx-2">Profile</Link>
      </nav>
    </header>
  );
};

export default Header;
