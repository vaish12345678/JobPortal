import React from "react";

const FeaturedJobs = () => {
  const jobs = [
    { id: 1, title: "Frontend Developer", company: "Company A" },
    { id: 2, title: "Backend Developer", company: "Company B" },
    { id: 3, title: "Full Stack Developer", company: "Company C" },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Featured Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
            <a href={`/job/${job.id}`} className="text-blue-600 mt-3 inline-block">
              View Details
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;
