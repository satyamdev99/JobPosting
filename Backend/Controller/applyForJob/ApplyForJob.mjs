import JobApplication from '../../Models/JobApplication.Model.mjs';

const ApplyForJob = async (req, res) => {
  try {
    const { jobId } = req.body; // Only get jobId from request body
    const userId = req.user.userId; // Get userId from the middleware (JWT)

    // Check if the user has already applied for this job
    const existingApplication = await JobApplication.findOne({ jobId, userId });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job.' });
    }

    // Create a new job application
    const newApplication = new JobApplication({ jobId, userId });
    await newApplication.save();

    res.status(200).json({ message: 'Job application submitted successfully.' });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export default ApplyForJob;
