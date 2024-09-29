// src/pages/AddMovie.tsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import moment from "moment";

type Movie = {
  name: string;
  releaseDate: string;
};

const AddMovie: React.FC = () => {
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const navigate = useNavigate();
  const { movieId } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`/movies/${movieId}`);
        const data = response.data?.data;
        setTitle(data?.name);
        setReleaseDate(moment(data?.releaseDate).format("YYYY-MM-DD"));
      } catch (error) {
        console.log("Error getting movies", error);
      }
    }
    if (movieId) {
      getData();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new movie object
    const newMovie: Movie = {
      name: title,
      releaseDate: releaseDate,
    };
    if (movieId) {
      await axios.patch(`/movies/${movieId}`, newMovie);
    } else {
      await axios.post(`/movies/add`, newMovie);
    }

    // Add the movie and navigate back to home
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {!movieId ? "Add new movie" : "Update movie"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            className="w-full p-2 border rounded outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter movie name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Release Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded outline-none"
            placeholder="Release Date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-customPurple text-white p-2 rounded"
        >
          {!movieId ? "Create movie" : "Update movie"}
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
