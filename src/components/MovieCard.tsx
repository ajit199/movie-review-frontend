import React from "react";
import moment from "moment";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type MovieCardProps = {
  id: string;
  title: string;
  releaseDate: string;
  rating?: null | number;
  onClick: (id: string) => void;
  onEditMovie: (id: string) => void;
  onDeleteMovie: (id: string) => void;
};

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  releaseDate,
  rating,
  onClick,
  onEditMovie,
  onDeleteMovie,
}) => {
  return (
    <div className="h-36 bg-cardBg p-4 rounded-lg shadow-md cursor-pointer relative">
      <div className="flex flex-col gap-3" onClick={() => onClick(id)}>
        <h3 className="text-xl font-thin text-movieName">{title}</h3>
        <p className="text-sm text-gray-600">
          Released: {moment(releaseDate).format("Do MMMM, YYYY")}
        </p>
        {rating ? (
          <p className="text-lg font-semibold">Rating: {rating}/10</p>
        ) : (
          ""
        )}
      </div>
      <div className="absolute bottom-1 right-4 space-x-2 mt-2">
        {/* Edit and Delete buttons */}
        <button onClick={() => onEditMovie(id)}>
          <FaRegEdit color="#7a8894" size={20} />
        </button>
        <button onClick={() => onDeleteMovie(id)}>
          <MdDelete color="#7a8894" size={20} />
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
