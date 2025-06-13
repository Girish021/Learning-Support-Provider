import React, { useEffect, useState } from "react";
import { fetchProviders } from "../Services/api";
import ProviderCard from "../Component/ProviderCard";
import SearchBar from "../Component/SearchBar";

const Home = () => {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProviders = async () => {
      setLoading(true);
      try {
        const data = await fetchProviders();
        setProviders(data);
      } catch (err) {
        setError("Failed to load providers");
      } finally {
        setLoading(false);
      }
    };
    loadProviders();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProviders(providers);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = providers.filter(
        (provider) =>
          provider.name.toLowerCase().includes(term) ||
          provider.specialization.toLowerCase().includes(term)
      );
      setFilteredProviders(filtered);
    }
  }, [searchTerm, providers]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg text-red-700">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 p-2 bg-red-600 text-white rounded hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Learning Support Providers{" "}
      </h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {filteredProviders?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No Providers Found Matching your Search{" "}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders?.map((provider) => (
            <ProviderCard key={provider?.id} provider={provider} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
