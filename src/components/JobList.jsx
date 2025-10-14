import React, { useEffect, useState } from "react";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/list_jobs/")
      .then((r) => r.json())
      .then(setJobs);
  }, []);

  return (
    <div className="card job-list-card">
      <h2 className="list-title">Available Jobs</h2>
      <ul className="job-list">
        {jobs.map((j) => (
          <li className="job-item" key={j._id}>
            <div className="job-title">{j.title}</div>
            <div className="job-keywords">
              keywords: {j.keywords.join(", ")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
