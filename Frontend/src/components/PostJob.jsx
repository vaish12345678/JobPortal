import { useEffect, useState } from "react";
import axios from "axios";
import { JOB_API_POINT, COMPANY_API_POINT } from "../utils/Apicall";

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "Full-Time",
    experience: "",
    position: "",
    companyId: "",
  });

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data && res.data.success && res.data.company) {
          setCompany(res.data.company);
          setJobData((prev) => ({
            ...prev,
            companyId: res.data.company._id,
          }));
        } else {
          setErrorMsg("No company found. Please register your company first.");
        }
      } catch (err) {
        console.log("Failed to fetch company", err);
        setErrorMsg("Unable to fetch company. Are you logged in as recruiter?");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${JOB_API_POINT}/post`, jobData, {
        withCredentials: true,
      });

      setSuccessMsg("Job posted successfully!");
      setJobData((prev) => ({
        ...prev,
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "Full-Time",
        experience: "",
        position: "",
      }));
    } catch (err) {
      console.error("Error posting job", err);
      setErrorMsg("Failed to post job. Make sure all fields are filled and you're authenticated.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto bg-gray-100 p-8 rounded shadow">
        <h3 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Post a New Job
        </h3>

        {loading ? (
          <p className="text-center">Loading company info...</p>
        ) : errorMsg ? (
          <p className="text-red-500 text-center">{errorMsg}</p>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              className="p-2 border rounded"
              value={jobData.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Job Description"
              className="p-2 border rounded"
              value={jobData.description}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="requirements"
              placeholder="Requirements (comma-separated)"
              className="p-2 border rounded"
              value={jobData.requirements}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="salary"
              placeholder="Salary"
              className="p-2 border rounded"
              value={jobData.salary}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="p-2 border rounded"
              value={jobData.location}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="experience"
              placeholder="Experience Level"
              className="p-2 border rounded"
              value={jobData.experience}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="position"
              placeholder="Position (e.g., Frontend Developer)"
              className="p-2 border rounded"
              value={jobData.position}
              onChange={handleChange}
              required
            />
            <select
              name="jobType"
              className="p-2 border rounded"
              value={jobData.jobType}
              onChange={handleChange}
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Submit Job
            </button>

            {successMsg && (
              <p className="text-green-600 text-center mt-2">{successMsg}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default PostJob;
