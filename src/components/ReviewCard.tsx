import React from "react";

type ReviewCardProps = {
  reviewer: string;
  comment: string;
  rating: number;
};

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewer,
  comment,
  rating,
}) => {
  return (
    <>
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between">
          <p className="text-xl">{comment}</p>
          <p className="text-lg font-semibold text-customPurple">
            Rating: {rating}/10
          </p>
        </div>
        <div>
          <p className="text-lg text-gray-600">
            {reviewer ? `By ${reviewer}` : ""}
          </p>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
