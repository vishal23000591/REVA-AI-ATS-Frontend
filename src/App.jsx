import React from "react";
import AddJob from "./components/AddJob";
import UploadResume from "./components/UploadResume";
import JobList from "./components/JobList";

function App() {
  return (
    <div className="app-container">
      <h1 className="main-heading">REVA AI – ATS Resume Screener</h1>
      <AddJob />
      <JobList />
      <UploadResume />
    </div>
  );
}

export default App;

