

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@fontsource/roboto/300.css";

const HeroSection = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/browse?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <section className="relative w-full py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="relative container mx-auto text-center px-6">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-roboto text-blue-600 leading-tight">
            Find Your <span className="text-green-600">Dream Job</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Explore thousands of job opportunities from top companies
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-2xl mx-auto"
        >
          <div className="relative flex-1 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search for jobs, companies, or locations..."
              value={search}
              onChange={handleSearchChange}
              className="w-full p-4 pl-12 pr-4 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-lg"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            type="submit"
            className="px-8 py-4 bg-blue-700 text-white rounded-xl hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl w-full sm:w-auto"
          >
            Search Jobs
          </button>
        </form>

        {/* Quick Stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-600">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">10K+</div>
            <div className="text-sm">Jobs Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">500+</div>
            <div className="text-sm">Companies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">95%</div>
            <div className="text-sm">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;