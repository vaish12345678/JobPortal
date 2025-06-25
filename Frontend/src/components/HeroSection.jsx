import { useState } from "react";
import "@fontsource/roboto/300.css";
const HeroSection = () => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    // The current value typed in the input field.
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here (e.g., redirect to job listings with search query)
    console.log("Searching for:", search);
  };

  return (
    <section className="relative w-full py-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("your-image-url.jpg")' }}
      ></div>
      <div className="relative container mx-auto text-center px-6">
        {/* Updated Text Color */}
        <h1 className="text-5xl font-bold mb-4 font-roboto text-blue-600">
          Find Your <span className="text-green-600">Dream Job</span>
        </h1>

        <p className="text-xl mb-8 text-gray-700">
          Explore thousands of job opportunities tailored for you
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex justify-center items-center space-x-4"
        >
          <input
            type="text"
            placeholder="Search for jobs, companies, or locations"
            value={search}
            onChange={handleSearchChange}
            className="p-4 rounded-lg w-80 max-w-xs border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
