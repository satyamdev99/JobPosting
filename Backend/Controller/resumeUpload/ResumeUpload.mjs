// Controllers/ResumeUpload.Controller.mjs
const uploadResume = async (req, res) => {
    try {
        const { jobId } = req.body;
        console.log("ss",jobId)

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        const resumePath = req.file.path; // Save path to file

        // Optional: Save resume path and jobId in the database (depends on your requirement)
        console.log(`Resume uploaded for job: ${jobId}, path: ${resumePath}`);

        res.status(200).json({ message: "Resume uploaded successfully.", path: resumePath });
    } catch (error) {
        console.error("Error uploading resume:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

export default uploadResume;
