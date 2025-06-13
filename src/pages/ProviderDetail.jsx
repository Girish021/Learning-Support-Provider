import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProviderById } from "../Services/api.js";
import RatingStars from "../Component/RatingStars.jsx";
//import RatingStars from "../Component/RatingStars.jsx";

const ProviderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      try {
        const data = await fetchProviderById(id);
        setProvider(data);
        setLoading(false);
      } catch (err) {
        setError("Provider not found");
        setLoading(false);
      }
    };

    loadProvider();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Provider Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The provider you're looking for doesn't exist or may have been
            removed.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Back to Providers List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Providers
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row">
            <div className="md:mr-6 mb-4 md:mb-0">
              <img
                src={provider.images}
                alt={`${provider.name} logo`}
                className="rounded-xl w-32 h-32 object-contain border-2 border-gray-100"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {provider.name}
              </h1>
              <div className="flex items-center mt-2">
                <RatingStars rating={provider.rating} />

                <span className="ml-2 text-gray-600">{provider.location}</span>
              </div>
              <p className="mt-2 text-lg text-blue-600 font-medium">
                {provider.specialization}
              </p>

              <div className="mt-4 flex flex-wrap gap-4">
                <a
                  href={`mailto:${provider.contactEmail}`}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {provider.contactEmail}
                </a>
                <a
                  href={`tel:${provider.phoneNumber}`}
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {provider.phoneNumber}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            About Our Services
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {provider.longDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProviderPage;
