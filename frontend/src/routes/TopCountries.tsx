import { useQuery } from '@tanstack/react-query'
import Table from "react-bootstrap/Table"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import type TopCountry from '../models/topCountry'
import { getTopCountries } from '../api/queryAPI'
import Spinner from '../components/Spinner'
import AlertError from '../components/AlertError'

/**
 * Table displaying countries with the most twitter posts.
 * @returns TopCountries component
 */
const TopCountries = (): React.JSX.Element => {
    const { data, error, isLoading } = useQuery<TopCountry[]>({
        queryKey: ["top-countries"],
        queryFn: getTopCountries,
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
                        Top Countries by Tweet Count
                    </Card.Header>
                    {data && data.length > 0 ? (
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Country</th>
                                    <th>Tweet Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((country, index) => (
                                    <tr key={country.country}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{country.country}</td>
                                        <td>{country.count}</td>
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
    );
};

export default TopCountries;