import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserAndToken } from "../../redux/authSlice";

const TopNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(clearUserAndToken());
    navigate("/auth/signin");
  };

  return (
    <nav className=" bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            className="w-9 h-9 mr-2"
            src="https://play-lh.googleusercontent.com/Im3CE-kmZJmZMC8pkhpCj7tGznPI6LC1EjhaTJ3E6Cdh_mgW5VxF_joZK31XWwZPmkT5"
            alt=""
          />
          <span className="text-gray-700 font-semibold font-serif text-lg">
            DealsDray
          </span>
        </Link>

        <ul className="flex items-center">
          <li className="mr-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Home
            </Link>
          </li>
          <li className="mr-4">
            <Link
              to="/Employee"
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Employee List
            </Link>
          </li>
          <li className="mr-4">
            <p className="text-gray-700 font-semibold">
              {currentUser?.userName}
            </p>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopNav;
