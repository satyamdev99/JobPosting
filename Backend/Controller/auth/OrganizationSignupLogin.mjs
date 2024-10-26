// auth/SignupLogin.mjs
import bcrypt from 'bcryptjs'; // For hashing passwords
import jwt from 'jsonwebtoken'; // For creating tokens
import {OrganizationUserData} from '../../Models/index.Models.mjs'; // Import the User model

// Define the signup function
export const OrganizationSignup = async (req, res) => {
    const { firstName, lastName, email, country, mobile, password } = req.body;

    try {
        // Validate required fields
        if (!firstName || !lastName || !email || !country || !mobile || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await OrganizationUserData.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new OrganizationUserData({
            firstName,
            lastName,
            email,
            country,
            mobile,
            password: hashedPassword,
        });

        await newUser.save();

        // Optional: Generate JWT token upon registration
        const token = jwt.sign({ userId: newUser._id }, 'SatyamBoss', { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Define the login function
export const OrganizationLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find the user by email
        const user = await OrganizationUserData.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token upon successful login
        const token = jwt.sign({ userId: user._id }, 'SatyamLegend', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Export both signup and login functions
