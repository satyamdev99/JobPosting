import { JobModel } from '../../Models/index.Models.mjs';

const AddJobData = async (req, res) => {
  try {
    console.log('Incoming Job Data:', req.body); // Log the received data

    const {
      title, description, employmentType, experience, role, skills,
      requirements, location, validTill, salary, status
    } = req.body;

    // Validate all required fields
    if (
      !title || !description || !employmentType || !experience ||
      !role || !skills || !requirements || !location ||
      !validTill || !salary || !status
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newJob = new JobModel({
      title,
      description,
      employmentType,
      experience: parseInt(experience),  // Ensure experience is saved as a number
      role,
      skills,
      requirements,
      location,
      validTill: new Date(validTill),  // Convert to a Date object
      salary: parseFloat(salary),  // Ensure salary is saved as a float
      status,
    });

    await newJob.save();
    res.status(201).json({ message: 'Job added successfully' });
  } catch (error) {
    console.error('Error adding job:', error.message); // Log full error
    res.status(500).json({ message: 'Error adding job', error: error.message });
  }
};

export default AddJobData;
