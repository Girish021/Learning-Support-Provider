import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-indigo-800 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <Link
          to="/"
          className="text-2xl font-bold hover:text-indigo-200 transition-colors"
        >
          Learning Support Directory
        </Link>
      </nav>
    </header>
  );
};

export default Header;


