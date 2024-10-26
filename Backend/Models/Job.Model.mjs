import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'],
    required: true,
  },
  experience: {
    type: Number,
    required: true, // Specify experience in years
    min: 0,
  },
  role: {
    type: String,
    required: true,
  },
  skills: {
    type: String, // Consider using an array of strings if you need multiple skills
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  validTill: {
    type: Date,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the Job model
const JobModel = mongoose.model('Job', JobSchema);

export default JobModel;
