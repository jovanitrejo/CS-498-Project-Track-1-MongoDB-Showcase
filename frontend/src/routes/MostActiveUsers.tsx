import { useQuery } from "@tanstack/react-query";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { getMostActiveUsers } from '../api/queryAPI';
import Spinner from "../components/Spinner";
import AlertError from "../components/AlertError";
import type ActiveUserResponse from "../models/activeUserResponse";
import Card from "react-bootstrap/Card";

/**
 * Displays a table of the most active users.
 * @returns The MostActiveUsers page component.
 */
const MostActiveUsers = (): React.JSX.Element => {
    const { data, error, isLoading } = useQuery<ActiveUserResponse[]>({
        queryKey: ["most-active-users"],
        queryFn: getMostActiveUsers,
    })

    if (isLoading) return <Spinner />
    if (error) return <AlertError error={error} />

    return (
        <Container className="py-4">
            <Card>
                <Card.Body>
                    <Card.Header
                        className="mb-4"
                        as="h2"
                    >
                        View Most Active Users
                    </Card.Header>
                    {data && data.length > 0 ? (
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Screen Name</th>
                                    <th>Tweet Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((user) => (
                                    <tr key={user.user_id}>
                                        <td>{user.user_id}</td>
                                        <td>{user.user_name}</td>
                                        <td>{user.screen_name}</td>
                                        <td>{user.tweet_count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p>No engagement data available...</p>
                    )}
                </Card.Body>
            </Card>
        </Container>
    )
}

export default MostActiveUsers;