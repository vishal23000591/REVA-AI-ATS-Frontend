import React, { useState } from "react";

export default function AddJob() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [keywords, setKeywords] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", desc);
    fd.append("keywords", keywords);
    const res = await fetch("https://reva-ai-ats-backend.onrender.com/add_job/", {
      method: "POST",
      body: fd,
    });
    const data = await res.json();
    alert("Job Added: " + data.job_id);
  };

  return (
    <form className="card add-job-form" onSubmit={submit}>
      <h2 className="form-title">Add Job</h2>
      <input
        className="form-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Job Title"
      />
      <textarea
        className="form-input"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Job Description"
      />
      <input
        className="form-input"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        placeholder="Keywords (comma separated)"
      />
      <button className="form-btn" type="submit">
        Add
      </button>
    </form>
  );
}
