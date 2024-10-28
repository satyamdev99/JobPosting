import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ShowAllAppliedUsersForSpecificJob = () => {
  const { jobId } = useParams();
  const [usersData, setUsersData] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersData = async () => {
      setLoading(true); // Start loading state
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found. User may not be authenticated.");
          return; // Exit if no token is available
        }

        const response = await fetch(
          `http://localhost:3000/get-applications-by-job-id/${jobId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
              "Content-Type": "application/json", // Add if your server expects this
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          // Assuming data contains users and applications
          setUsersData(data.users); // Set users from the response
          setApplications(data.applications); // Set applications from the response
        } else {
          console.error("Failed to fetch usersData:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching usersData:", error);
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchUsersData();
  }, [jobId]);

  if (loading) {
    return (
      <Typography variant="h6" align="center">
        Loading...
      </Typography>
    );
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Users Data for Job ID: {jobId}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Resume</TableCell>
              {/* Add other relevant columns as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.length > 0 ? (
              usersData.map((applicant) => {
                // Find the application for the current user
                const application = applications.find(app => app.userId === applicant._id);
                
                return (
                  <TableRow key={applicant._id}>
                    <TableCell>
                      {applicant.firstName} {applicant.lastName}
                    </TableCell>
                    <TableCell>{applicant.email}</TableCell>
                    <TableCell>{applicant.mobile}</TableCell>
                    <TableCell>
                      {application && application.resumeFilename ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            window.open(
                              `http://localhost:3000/uploads/resumes/${application.resumeFilename}`,
                              "_blank"
                            )
                          }
                        >
                          View Resume
                        </Button>
                      ) : (
                        "No Resume Available"
                      )}
                    </TableCell>
                    {/* Add other relevant cells as needed */}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ShowAllAppliedUsersForSpecificJob;
