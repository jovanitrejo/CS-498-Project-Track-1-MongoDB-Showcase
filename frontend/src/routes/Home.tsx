import React from "react";
import { Link } from "react-router";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

/**
 * This component is used to render all of the advanced query options for this project.
 * @returns A JSX Element to be rendered on the DOM.
 */
const Home = (): React.JSX.Element => {
  return (
    <Container className="py-4">
      <Row className="align-items-stretch g-3">
        <Col md={6} lg={4}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title as="h5">Most Active Countries</Card.Title>
              <Card.Text>
                View the top countries that have the most tweets!
              </Card.Text>

              <Link
                to="/top-countries"
                className="mt-auto text-decoration-none"
              >
                <Button variant="outline-primary" className="w-100">
                  Go to Top Countries
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title as="h5">View Tweets by User</Card.Title>
              <Card.Text>View tweets by a specific user.</Card.Text>

              <Link
                to="/tweets"
                className="mt-auto text-decoration-none"
              >
                <Button variant="outline-primary" className="w-100">
                  View Tweets by User
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title as="h5">View Most Active Users</Card.Title>
              <Card.Text>
                View the most active users regarding the dataset.
              </Card.Text>

              <Link
                to="/most-active-users"
                className="mt-auto text-decoration-none"
              >
                <Button variant="outline-primary" className="w-100">
                  View Most Active Users
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title as="h5">View Top Hashtags</Card.Title>
              <Card.Text>
                View the most popular hashtags in the dataset.
              </Card.Text>

              <Link to="/top-hashtags" className="mt-auto text-decoration-none">
                <Button variant="outline-primary" className="w-100">
                  View Top Hashtags
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title as="h5">Engagement Breakdown</Card.Title>
              <Card.Text>
                View the breakdown of engagements, including retweets, quotes,
                and replies by verified users.
              </Card.Text>

              <Link
                to="/engagement-breakdown"
                className="mt-auto text-decoration-none"
              >
                <Button variant="outline-primary" className="w-100">
                  View Engagement Breakdown
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
