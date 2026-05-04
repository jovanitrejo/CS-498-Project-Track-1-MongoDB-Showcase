import { useQuery } from '@tanstack/react-query'
import Table from "react-bootstrap/Table"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import type Hashtag from '../models/topHashtags'
import { getTopHashtags } from '../api/queryAPI'
import Spinner from '../components/Spinner'
import AlertError from '../components/AlertError'

/**
 * Table displaying hashtags with the most twitter posts.
 * @returns TopHashtags component
 */
const TopHashtags = (): React.JSX.Element => {
    const { data, error, isLoading } = useQuery<Hashtag[]>({
        queryKey: ["top-hashtags"],
        queryFn: getTopHashtags,
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
                        Top Hashtags by Tweet Count
                    </Card.Header>
                    {data && data.length > 0 ? (
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Hashtag</th>
                                    <th>Tweet Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((hashtag, index) => (
                                    <tr key={hashtag.hashtag}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{hashtag.hashtag}</td>
                                        <td>{hashtag.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p>No hashtag data avialable!</p>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default TopHashtags;