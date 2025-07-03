import React, { useState } from 'react';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  
];

const FilterCard = ({ onFiltersChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleChange = (filterType, value) => {
    const newFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(newFilters);
    onFiltersChange(newFilters); // Send to Jobs.jsx
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full max-w-md space-y-6">
      {filterData.map((filterGroup) => (
        <div key={filterGroup.filterType}>
          <h3 className="text-lg font-semibold mb-2">{filterGroup.filterType}</h3>
          <div className="space-y-1">
            {filterGroup.array.map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={filterGroup.filterType}
                  value={option}
                  checked={selectedFilters[filterGroup.filterType] === option}
                  onChange={() => handleChange(filterGroup.filterType, option)}
                  className="form-radio text-blue-500"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
