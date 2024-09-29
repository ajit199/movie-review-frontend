import React from "react";
import MovieCard from "./MovieCard";

type Movie = {
  _id: string;
  name: string;
  releaseDate: string;
  averageRating?: null | number;
};

type MovieListProps = {
  movies: Movie[];
  onSelectMovie: (id: string) => void;
  onEditMovie: (id: string) => void;
  onDeleteMovie: (id: string) => void;
};

const MovieList: React.FC<MovieListProps> = ({
  movies,
  onSelectMovie,
  onDeleteMovie,
  onEditMovie,
}) => {
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {movies?.length > 0
        ? movies?.map((movie) => (
            <MovieCard
              key={movie?._id}
              id={movie?._id}
              title={movie?.name}
              releaseDate={movie?.releaseDate}
              rating={movie?.averageRating}
              onClick={() => onSelectMovie(movie?._id)}
              onDeleteMovie={onDeleteMovie}
              onEditMovie={onEditMovie}
            />
          ))
        : ""}
    </div>
  );
};

export default MovieList;
