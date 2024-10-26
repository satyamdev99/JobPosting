import jwt from 'jsonwebtoken';
import {JobModel} from '../../Models/index.Models.mjs'; // Adjust the import path if needed
 // Load .env variables



const GetJobsByEmail = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, secretKey);
    const email = decoded.email; // Extract email from JWT payload

    const jobs = await JobModel.find({ postedBy: email }); // Query jobs by email
    res.status(200).json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
  }
};

export default GetJobsByEmail;
