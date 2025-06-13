import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

const ProviderCard = ({ provider }) => {
  return (
    <div>
      <Link
        to={`/provider/${provider.id}`}
        className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100"
      >
        <div className="flex items-center">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-semibold">{provider?.name}</h3>
            <p className="text-sm text-blue-500 font-medium">
              {provider?.name}
            </p>
            <div className="mt-2 flex items-center">
              <RatingStars rating={provider?.rating} />
              <span className="ml-2 text-sm text-gray-500">
                {provider?.location}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600 truncate">
              {provider?.shortDescription}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProviderCard;
