

import { useState } from "react";
import Navbar from "../shared/Navbar";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
const Companies = () => {
  const navigate= useNavigate();
  const [input, setInput] = useState("");

 

  return (
    <div>
      <Navbar />
      <CompaniesTable/>
      {/* <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
             
          <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between gap-4 mb-6"
        >
          <input
            type="text"
            id="name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Filter by name"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
          />

          <button onClick={()=> navigate("/admin/companies/create")}
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            New Company
          </button>
        </form> 

        </div>


      </div>  */}
      
    </div>
  );
};

export default Companies;

