import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-200 border-b border-gray-100 px-4 py-3 flex flex-col md:flex-row md:justify-between items-center">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link to="/" className="text-2xl font-thin text-gray-800">
          MOVIECRITIC
        </Link>
      </div>

      <div className="flex mt-3 md:mt-0 space-x-2">
        <button
          className="bg-white border border-customPurple text-customPurple px-4 py-2 rounded"
          onClick={() => navigate("/add-movie")}
        >
          Add new movie
        </button>
        <button
          className="bg-customPurple text-white px-4 py-2 rounded"
          onClick={() => navigate("/add-review")}
        >
          Add new review
        </button>
      </div>
    </header>
  );
};

export default Header;
