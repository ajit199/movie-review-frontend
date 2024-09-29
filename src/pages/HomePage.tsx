import React, { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
  };

  const handleSelectMovie = (id: string) => {
    navigate(`/movie/${id}`);
    console.log("Selected Movie ID:", id);
    // Navigate to the movie review page (use react-router for navigation)
  };

  const handleEditReview = (movieId: string) => {
    console.log(`editing review with ID: ${movieId}`);
    navigate(`/update-movie/${movieId}`);
    // Implement edit review functionality here
  };

  const handleDeleteReview = async (movieId: string) => {
    await axios.delete(`/movies/${movieId}`);
    getData();
  };

  async function getData() {
    try {
      const response = await axios.get(`/movies?search=${search}`);
      const data = response.data?.data;

      setFilteredMovies(data);
    } catch (error) {
      console.log("Error getting movies", error);
    }
  }

  useEffect(() => {
    getData();
  }, [search]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">The best movie reviews site!</h1>
      <SearchBar onSearch={handleSearch} />
      <MovieList
        movies={filteredMovies}
        onSelectMovie={handleSelectMovie}
        onEditMovie={handleEditReview}
        onDeleteMovie={handleDeleteReview}
      />
    </div>
  );
};

export default HomePage;
