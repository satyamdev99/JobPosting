import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../src/LandingPage/LandingPage';
import Register from '../src/auth/Register'; // Create this component
import Login from '../src/auth/Login';
import ResetPassword from './auth/ResetPassword';
import Signup from "../src/organizationAuth/Signup"
import OrganizationLogin from './organizationAuth/Login';
import OrganizationResetPassword from './organizationAuth/OrganizationResetPassword';
import AddJob from './organizationJobPosting/AddJobDetail';
import ShowAllActiveJobsForJobSeekers from './showAllActiveJobsForJobSeekers/ShowAllActiveJobsForJobSeekers';
import ResumeUpload from './resumeUpload/ResumeUpload';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/applicant-login" element={<Login />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/auth/organization-signup" element={<Signup />} />
      <Route path="/auth/organization-login" element={<OrganizationLogin />} />
      <Route path="/auth/organization-reset-password" element={<OrganizationResetPassword />} />

      <Route path="/admin/add-job" element={<AddJob />} />

      <Route path="/job-seekers/show-all-active-jobs" element={<ShowAllActiveJobsForJobSeekers />} />
      <Route path="/job-seekers/upload-resume" element={<ResumeUpload />} />
    </Routes>
  );
}

export default App;
