import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract jobId from query parameters
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get("jobId");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobId", jobId); // Attach jobId to link with the application

    try {
      const response = await fetch("http://localhost:3000/upload-resume", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Resume uploaded successfully!");
        navigate("/job-seekers/show-all-active-jobs"); // Redirect to the jobs page or a success page
      } else {
        const result = await response.json();
        alert(result.message || "Failed to upload resume.");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Upload Your Resume</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ResumeUpload;
