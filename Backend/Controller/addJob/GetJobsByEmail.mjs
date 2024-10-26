// GetJobsByEmail.js
import { JobModel } from '../../Models/index.Models.mjs'; // Adjust the import path if needed
import { AuthenticateOrganizationUserJwt } from '../../Middleware/index.MiddleWare.mjs'; // Import the middleware

const GetJobsByEmail = async (req, res) => {
  try {
    // Extract email from req.user set by the middleware
    const email = req.user.email; 

    // Query jobs by email
    const jobs = await JobModel.find({ postedBy: email });
    res.status(200).json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
  }
};

export default GetJobsByEmail;
