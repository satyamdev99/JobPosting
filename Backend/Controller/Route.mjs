
// index.js (or server.js)
import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "../Models/index.Models.mjs"
import { Signup,Login, SendOtp, VerifyOtp, ResetPassword, OrganizationSignup, OrganizationLogin, OrganizationResetPassword,AddJob,GetJobsByEmail } from './index.Controller.mjs';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());


// Connect to MongoDB
connectDB();

// Example route
app.post("/signup", Signup);
app.post("/login", Login);
app.post('/send-otp', SendOtp);
app.post('/verify-otp', VerifyOtp);
app.post('/reset-password', ResetPassword);

//for organization....
app.post("/organization-signup",OrganizationSignup );
app.post("/organization-login",OrganizationLogin );
app.post("/organization-reset-password",OrganizationResetPassword );

app.post("/add-job", AddJob);
app.get('/get-jobs-by-email', GetJobsByEmail);




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
