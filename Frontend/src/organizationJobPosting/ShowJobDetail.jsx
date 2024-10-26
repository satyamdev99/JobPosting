import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchJobs = async () => {
    const token = localStorage.getItem('token'); // Get JWT from localStorage

    try {
      const response = await fetch('http://localhost:3000/get-jobs-by-email', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Send token in Authorization header
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs);
        setFilteredJobs(data.jobs);
      } else {
        alert('Failed to fetch jobs.');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(query) ||
      job.role.toLowerCase().includes(query) ||
      job.skills.toLowerCase().includes(query)
    );

    setFilteredJobs(filtered);
  };

  const getRandomColor = () => {
    const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Container className="mt-5">
      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search by title, role, or skills..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </Form.Group>

      <Row>
        {filteredJobs.map((job) => (
          <Col key={job._id} md={4} className="mb-4">
            <Card bg={getRandomColor()} text="white" className="h-100">
              <Card.Header>{job.title}</Card.Header>
              <Card.Body>
                <Card.Title>{job.role}</Card.Title>
                <Card.Text>
                  <strong>Skills:</strong> {job.skills}
                  <br />
                  <strong>Location:</strong> {job.location}
                  <br />
                  <strong>Salary:</strong> ${job.salary}
                  <br />
                  <strong>Status:</strong> {job.status}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default JobList;
