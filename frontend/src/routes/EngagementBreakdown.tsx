import type EngagementBreakdownResponse from "../models/engagementBreakdown";
import { getEngagementBreakdown } from "../api/queryAPI";
import { useQuery } from "@tanstack/react-query";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Spinner from "../components/Spinner";
import AlertError from "../components/AlertError";

/**
 * The EngagementBreakdown component is responsible for fetching and displaying the engagement breakdown for verified users. It uses the `useQuery` hook from React Query to fetch data from the backend API and displays it in a table format. The component also handles loading and error states, showing a spinner while data is being fetched and an alert if an error occurs.
 * @returns A React JSX element that represents the engagement breakdown for verified users.
 */
const EngagementBreakdown = (): React.JSX.Element => {
  const { data, error, isLoading } = useQuery<EngagementBreakdownResponse[]>({
    queryKey: ["engagementBreakdown"],
    queryFn: getEngagementBreakdown,
  })

  if (isLoading) return <Spinner />
  if (error) return <AlertError error={error} />

  return (
    <Container className="py-4">
      <Card>
        <Card.Body>
          <Card.Header
            as="h2"
            className="mb-4"
          >
            Engagement Breakdown by User
          </Card.Header>
          {data && data.length > 0 ? (
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Screen Name</th>
                  <th>Total Tweets</th>
                  <th>Simple %</th>
                  <th>Retweet %</th>
                  <th>Quote %</th>
                  <th>Reply %</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.screen_name}>
                    <td>{item.user_name}</td>
                    <td>{item.screen_name}</td>
                    <td>{item.total_tweets}</td>
                    <td>{item.simple_percent.toFixed(2)}%</td>
                    <td>{item.retweet_percent.toFixed(2)}%</td>
                    <td>{item.quote_percent.toFixed(2)}%</td>
                    <td>{item.reply_percent.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No engagement data avialable!</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default EngagementBreakdown;