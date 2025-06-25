// import React from "react";

// const FilterCard = () => {
//   return (
//     <div className="p-4 border rounded-lg shadow-sm bg-white">
//       <h2 className="text-xl font-semibold text-blue-600 mb-4">Filter Jobs</h2>
//       <div className="flex flex-col gap-4">
//         <select className="border p-2 rounded">
//           <option>Job Type</option>
//           <option>Full Time</option>
//           <option>Part Time</option>
//           <option>Internship</option>
//         </select>
//         <select className="border p-2 rounded">
//           <option>Location</option>
//           <option>Pune</option>
//           <option>Mumbai</option>
//           <option>Remote</option>
//         </select>
//         <select className="border p-2 rounded">
//           <option>Experience Level</option>
//           <option>Fresher</option>
//           <option>1-3 Years</option>
//           <option>3+ Years</option>
//         </select>
//         <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
//           Apply Filter
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilterCard;'


// import react from "react";
// const filterData = [
//     {
//         filterType:"Location",
//         array:["Delhi,Banglore,Pune,Mumbai"]
//     },
//     {
//         filterType:"Industry",
//         array:["frontend Developer","Backend Developer", "FullStack Developer"]
//     },
//     {
//         filterType:"Salary",
//         array:["0-20k","20-80k", "80- 1.5 lakh"]
//     }

    
// ]


// const FilterCard=()=>{
//     return(
//         <div>
//             <h1>Filter Jobs</h1>

//         </div>
//     )
// }

// export default FilterCard


// import React, { useState } from 'react';

// const Filter = ({ onFilterChange }) => {
//   const [selected, setSelected] = useState('');

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setSelected(value);
//     onFilterChange(value); // Pass selected value to parent
//   };

//   return (
//     <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-md mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Filter by Job Type</h2>
//       <form className="space-y-2">
//         {['Full-time', 'Part-time', 'Internship', 'Remote'].map((type) => (
//           <label key={type} className="flex items-center space-x-2 cursor-pointer">
//             <input
//               type="radio"
//               name="jobType"
//               value={type}
//               checked={selected === type}
//               onChange={handleChange}
//               className="form-radio text-blue-500"
//             />
//             <span>{type}</span>
//           </label>
//         ))}
//       </form>
//     </div>
//   );
// };

// export default Filter;
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
  {
    filterType: "Salary",
    array: ["5k-20k", "20-80k", "80k-1.5L"]
  }
];

const Filter = ({ onFiltersChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleChange = (filterType, value) => {
    const newFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(newFilters);
    onFiltersChange(newFilters); // Send updated filters to parent
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

export default Filter;
