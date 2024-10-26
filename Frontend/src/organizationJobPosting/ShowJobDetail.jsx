import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Form, Button, Modal, Dropdown } from 'react-bootstrap';
import { FaEllipsisV } from 'react-icons/fa'; // Three-dot icon
import { MdLocationOn, MdWork, MdDateRange } from 'react-icons/md'; // Icons for fields
import { BsBriefcaseFill, BsCalendarDate } from 'react-icons/bs'; // More Icons for styling
import '../css/JobList.css'; // Additional CSS for styling

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  // Fetch jobs from the API
  const fetchJobs = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/get-jobs-by-email', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
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

  const handleShowModal = (job) => {
    setCurrentJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSaveChanges = () => {
    alert('Job details updated successfully!');
    setShowModal(false);
  };

  // Helper function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
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
            <Card className="h-100 job-card bg-dark text-white">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Title>{job.title}</Card.Title>
                  <Dropdown>
                    <Dropdown.Toggle as="div" className="text-white">
                      <FaEllipsisV />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleShowModal(job)}>Edit</Dropdown.Item>
                      <Dropdown.Item>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <Card.Text className="mt-3">
                  <div className="job-detail">
                    <BsBriefcaseFill className="icon" /> <strong>Role:</strong> <span>{job.role}</span>
                  </div>
                  <div className="job-detail">
                    <MdWork className="icon" /> <strong>Employment Type:</strong> <span>{job.employmentType}</span>
                  </div>
                  <div className="job-detail">
                    <BsCalendarDate className="icon" /> <strong>Experience:</strong> <span>{job.experience} years</span>
                  </div>
                  <div className="job-detail">
                    <MdLocationOn className="icon" /> <strong>Location:</strong> <span>{job.location}</span>
                  </div>
                  <div className="job-detail">
                    <MdDateRange className="icon" /> <strong>Valid Till:</strong> <span>{formatDate(job.validTill)}</span>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {currentJob && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Job - {currentJob.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={currentJob.title}
                  onChange={(e) =>
                    setCurrentJob({ ...currentJob, title: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={currentJob.role}
                  onChange={(e) =>
                    setCurrentJob({ ...currentJob, role: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={currentJob.location}
                  onChange={(e) =>
                    setCurrentJob({ ...currentJob, location: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Experience</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={currentJob.experience}
                  onChange={(e) =>
                    setCurrentJob({ ...currentJob, experience: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Valid Till</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={currentJob.validTill}
                  onChange={(e) =>
                    setCurrentJob({ ...currentJob, validTill: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default JobList;
