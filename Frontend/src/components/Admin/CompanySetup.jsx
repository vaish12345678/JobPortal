// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "sonner";
// import { useParams, useNavigate } from "react-router-dom";
// import { COMPANY_API_POINT } from "../../utils/Apicall";

// const CompanySetup = () => {
//   const { companyId } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     website: "",
//     description: "",
//     location: "",
//     file:"",
//   });

//   // Fetch company name (optional)
// //   useEffect(() => {
// //     const fetchCompany = async () => {
// //       try {
// //         const res = await axios.get(`${COMPANY_API_POINT}/${companyId}`, {
// //           withCredentials: true,
// //         });
// //         setFormData((prev) => ({
// //           ...prev,
// //           companyName: res.data.company.companyName,
// //         }));
// //       } catch (err) {
// //         console.log(err);
// //       }
// //     };
// //     fetchCompany();
// //   }, [companyId]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const changeFileHandler=(e)=>{
//     const file=e.target.files?.[0];
//     setFormData({ ...formData,file});

//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.put(
//         `${COMPANY_API_POINT}/update/${companyId}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         toast.success("Company setup completed!");
//         navigate("/admin/companies");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to complete setup.");
//     }
//     console.log(formData);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
//       <h2 className="text-2xl font-bold mb-4">Complete Company Setup</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           value={formData.name}

//           className="w-full border px-4 py-2 rounded bg-gray-100"
//         />

//         <input
//           type="text"
//           name="website"
//           placeholder="Company Website"
//           value={formData.website}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//         />

//         <textarea
//           name="description"
//           placeholder="Company Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//           rows={4}
//         />

//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={formData.location}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//         />
//          <input
//           type="file"
//           name="file"
//           placeholder="upload logo"
//           accept="image/*"
//           onChange={changeFileHandler}
//           className="w-full border px-4 py-2 rounded"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Save & Finish
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CompanySetup;
import React, { useState,useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";
import { COMPANY_API_POINT } from "../../utils/Apicall";

const CompanySetup = () => {
  const {id: companyId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    website: "",
    description: "",
    location: "",
    file: null,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setFormData((prev) => ({
      ...prev,
      file,
    }));
  };

   useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_POINT}/get/${companyId}`, {
          withCredentials: true,
        });
        setFormData((prev) => ({
          ...prev,
          companyName: res.data.company.companyName,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchCompany();
  }, [companyId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("website", formData.website);
      data.append("description", formData.description);
      data.append("location", formData.location);
      if (formData.file) {
        data.append("file", formData.file);
      }

      const res = await axios.put(
        `${COMPANY_API_POINT}/update/${companyId}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Company setup completed!");
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to complete setup.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Complete Company Setup</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <button
          type="button"
          className="bg-gray-800 text-white px-4 py-2 rounded"
          onClick={() => navigate(-1)} // Go back to previous page
        >
          Back
        </button>

        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded bg-gray-100"
        />

        <input
          type="text"
          name="website"
          placeholder="Company Website"
          value={formData.website}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Company Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          rows={4}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={changeFileHandler}
          className="w-full border px-4 py-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save & Finish
        </button>
      </form>
    </div>
  );
};

export default CompanySetup;
