import React from "react";
import ReviewCard from "./ReviewCard";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type Review = {
  _id: string;
  reviewerName: string;
  rating: number;
  reviewComments: string;
};

type ReviewListProps = {
  reviews: Review[];
  onEditReview: (id: string) => void;
  onDeleteReview: (id: string) => void;
};

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  onEditReview,
  onDeleteReview,
}) => {
  return (
    <div className="space-y-4">
      {reviews?.length > 0 ? (
        reviews?.map((review) => (
          <div
            key={review?._id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm relative"
          >
            <ReviewCard
              reviewer={review?.reviewerName}
              comment={review?.reviewComments}
              rating={review?.rating}
            />
            <div className="absolute bottom-5 right-8 space-x-2">
              {/* Edit and Delete buttons */}
              <button
                onClick={() => onEditReview(review?._id)}
                // className="text-blue-500 hover:underline"
              >
                <FaRegEdit color="#7a8894" size={20} />
              </button>
              <button
                onClick={() => onDeleteReview(review?._id)}
                // className="text-red-500 hover:underline"
              >
                <MdDelete color="#7a8894" size={20} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-lg text-center text-bold">No Reviews</h1>
      )}
    </div>
  );
};

export default ReviewList;
