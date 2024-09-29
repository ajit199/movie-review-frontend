import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";

type Review = {
  movie: string;
  reviewerName: string;
  rating: number;
  reviewComments: string;
};

const AddReview: React.FC = () => {
  const [reviewer, setReviewer] = useState("");
  const [comment, setComment] = useState("");
  const [movie, setMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const [rating, setRating] = useState("");
  const navigate = useNavigate();
  const { reviewId } = useParams<{ reviewId: string }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new review object
    const review: Review = {
      movie: movie, // Generate a random ID for the review
      reviewerName: reviewer,
      reviewComments: comment,
      rating: Number(rating),
    };

    // Add the review to the movie and navigate back to the movie review page
    if (reviewId) {
      await axios.patch(`/reviews/${reviewId}`, review);
      navigate(`/movie/${movie}`);
    } else {
      await axios.post(`/reviews/add`, review);
      navigate(`/`);
    }
  };

  async function getData() {
    try {
      const response = await axios.get(`/reviews/${reviewId}`);
      const data = response.data?.data;
      setMovie(data?.movie);
      setReviewer(data?.reviewerName);
      setRating(data?.rating);
      setComment(data?.reviewComments);
    } catch (error) {
      console.log("Error getting movies", error);
    }
  }

  async function getMovies() {
    try {
      const response = await axios.get(`/movies`);
      const data = response.data?.data;
      setMovies(data);
    } catch (error) {
      console.log("error in movie fetch", error);
    }
  }
  useEffect(() => {
    if (reviewId) {
      getData();
    }
    getMovies();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {reviewId ? "Update review" : "Add a Review"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <select
            className="w-full p-2 border rounded outline-none"
            value={movie}
            onChange={(event) => setMovie(event.target.value)}
          >
            <option>Select a movie</option>
            {movies?.map((movie: any) => (
              <option key={movie?._id} value={movie?._id}>
                {movie?.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="text"
            className="w-full p-2 border rounded outline-none"
            value={reviewer}
            onChange={(e) => setReviewer(e.target.value)}
            placeholder="Enter your name"
            // required
          />
        </div>
        <div>
          <input
            type="number"
            step="0.1"
            className="w-full p-2 border rounded outline-none"
            value={rating}
            onChange={(e) => setRating(e.target.value ? e.target.value : "")}
            placeholder="Rating out of 10"
            min={1}
            max={10}
            required
          />
        </div>
        <div>
          <textarea
            className="w-full p-2 border rounded outline-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Review comments"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-customPurple text-white p-2 rounded"
        >
          {reviewId ? "Update review" : "Add Review"}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
