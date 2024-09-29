import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // For routing and navigation
import ReviewList from "../components/ReviewList";
import axios from "../utils/axios";

type Review = {
  _id: string;
  movie: string;
  reviewerName: string;
  rating: number;
  reviewComments: string;
};

type Movie = {
  _id: string;
  name: string;
  releaseDate: string;
  reviews: Review[];
};

const MovieReviewPage: React.FC = () => {
  // Get the movie ID from the URL params using React Router's `useParams` hook
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();

  // Sample state for movies and reviews (this can be fetched from an API or database)
  const [movie, setMovie] = useState<any>({});

  const handleEditReview = (reviewId: string) => {
    navigate(`/update-review/${reviewId}`);
    // Implement edit review functionality here
  };

  const handleDeleteReview = async (reviewId: string) => {
    await axios.delete(`/reviews/${reviewId}`);
    getData();
  };

  // Handle back navigation to the home page
  const handleBack = () => {
    navigate("/");
  };

  async function getData() {
    try {
      const response = await axios.get(`/movies/${movieId}`);
      const data = response.data?.data;

      setMovie(data);
    } catch (error) {
      console.log("Error getting movies", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="p-4">
      <button
        onClick={handleBack}
        className="text-blue-500 hover:underline mb-4"
      >
        &larr; Back to Home
      </button>

      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-2">{movie?.name}</h1>
        {/* <p className="text-sm text-gray-600 mb-4">
        Released: {moment(movie?.releaseDate).format("Do MMMM, YYYY")}
      </p> */}

        {/* Display the average rating */}
        <h2 className="text-2xl mb-4 text-customPurple">
          {movie?.averageRating}/10
        </h2>
      </div>
      {/* Render the ReviewList component */}
      <ReviewList
        reviews={movie?.reviews || []}
        onEditReview={handleEditReview}
        onDeleteReview={handleDeleteReview}
      />
    </div>
  );
};

export default MovieReviewPage;
