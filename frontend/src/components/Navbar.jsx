import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user } = useContext(UserContext);

  const showMenu = () => setMenu(!menu);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-10 lg:px-20 py-4 bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 shadow-lg">
      <h1 className="text-2xl font-extrabold text-white hover:text-gray-100 transition-transform duration-300 hover:scale-105">
        <Link to="/">StorySphere</Link>
      </h1>

      {path === "/" && (
        <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-1 shadow-md hover:shadow-lg focus-within:shadow-xl transition-all duration-300">
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none px-3 text-sm placeholder-gray-500 flex-grow"
            placeholder="Search a story..."
            type="text"
          />
          <p
            onClick={() => navigate(prompt ? `?search=${prompt}` : "/")}
            className="cursor-pointer text-purple-600 hover:text-indigo-600 transition-transform duration-300 hover:scale-110"
          >
            <BsSearch />
          </p>
        </div>
      )}

      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <h3 className="text-white hover:text-gray-200 transition-transform duration-300 hover:scale-105">
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <Link to="/login">
            <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-1 px-4 rounded-full shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105">
              Login
            </button>
          </Link>
        )}
        {user ? (
          <div onClick={showMenu} className="relative">
            <p className="cursor-pointer text-white transition-transform duration-300 hover:rotate-90">
              <FaBars className="text-xl" />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <Link to="/register">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-1 px-4 rounded-full shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105">
              Register
            </button>
          </Link>
        )}
      </div>

      <div
        onClick={showMenu}
        className="md:hidden text-white text-xl transition-transform duration-300 hover:rotate-90 cursor-pointer"
      >
        <FaBars />
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
