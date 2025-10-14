import React, { useState, useEffect } from "react";


export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [jobId, setJobId] = useState("");
  const [jobs, setJobs] = useState([]);
  const [score, setScore] = useState(null);
  const [breakdown, setBreakdown] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState([]);
  const [resumeSummary, setResumeSummary] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/list_jobs")
      .then((r) => r.json())
      .then(setJobs)
      .catch((err) => console.error(err));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!file || !jobId) return;

    const fd = new FormData();
    fd.append("file", file);
    fd.append("job_id", jobId);

    try {
      const res = await fetch("http://localhost:8000/upload_resume", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();

      setScore(data.score);
      setBreakdown(data.breakdown || {});
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setSkills(data.skills || []);

      const summary =
        data.resume_summary ||
        data.summary ||
        data.full_resume ||
        data.text ||
        "";
      setResumeSummary(summary);
    } catch (err) {
      console.error(err);
      setScore(null);
      setBreakdown(null);
      setEmail("");
      setPhone("");
      setSkills([]);
      setResumeSummary("");
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "auto" }}>
      {/* Upload Card */}
      <div className="card" style={{ animation: "fadeInUp 0.6s ease" }}>
        <h2>Upload Resume</h2>
        <form onSubmit={submit}>
          <select
            onChange={(e) => setJobId(e.target.value)}
            value={jobId}
            required
          >
            <option value="">Select Job</option>
            {jobs.map((j) => (
              <option key={j._id} value={j._id}>
                {j.title}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />

          <button type="submit">Upload & Score</button>
        </form>
      </div>

      {/* Results Card */}
      {score !== null && (
        <div
          className="card"
          style={{
            marginTop: "2rem",
            background: "linear-gradient(135deg, #eef3ff, #ffffff)",
          }}
        >
          <h3 style={{ textAlign: "center", color: "#07590fff" }}>
            Resume Score: {score}%
          </h3>

          {breakdown && (
            <ul>
              <li>Keyword Score: {breakdown.keyword}</li>
              <li>Semantic Score: {breakdown.semantic}</li>
              <li>TF-IDF Score: {breakdown.tfidf}</li>
            </ul>
          )}

          <div style={{ marginTop: "15px" }}>
            {email && (
              <p>
                <strong>Email:</strong> {email}
              </p>
            )}
            {phone && (
              <p>
                <strong>Phone:</strong> {phone}
              </p>
            )}
            {skills.length > 0 && (
              <p>
                <strong>Skills:</strong> {skills.join(", ")}
              </p>
            )}
            {resumeSummary && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "15px",
                  background: "#f0f4ff",
                  borderRadius: "12px",
                  whiteSpace: "pre-wrap",
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
               
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
