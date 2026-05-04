import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "../components/Spinner";
import AlertError from "../components/AlertError";
import { getTweetsByUsername } from "../api/queryAPI";
import type TweetResponse from "../models/tweetResponse";

/**
 * Display all tweets for a given user (searched by screen_name).
 * - Enter a screen_name and submit to load that user's tweets.
 */
const Tweets = (): React.JSX.Element => {
    const [screenName, setScreenName] = useState("");
    const [search, setSearch] = useState("");

    const { data, error, isFetching } = useQuery<TweetResponse[]>({
        queryKey: ["tweets", search],
        queryFn: () => getTweetsByUsername(search),
        enabled: Boolean(search),
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(screenName.trim());
    };

    return (
        <Container className="py-4">
            <Card>
                <Card.Body>
                    <Card.Header as="h2" className="mb-4">
                        View Tweets by User
                    </Card.Header>

                    <Form onSubmit={onSubmit} className="mb-4">
                        <Form.Group className="d-flex gap-2" controlId="screenName">
                            <Form.Control
                                placeholder="Enter screen_name (without @)"
                                value={screenName}
                                onChange={(e) => setScreenName(e.target.value)}
                            />
                            <Button type="submit" variant="primary" disabled={!screenName.trim()}>
                                Search
                            </Button>
                        </Form.Group>
                    </Form>

                    {isFetching && <Spinner />}
                    {error && <AlertError error={error as Error} />}

                    {!isFetching && !error && data && data.length > 0 ? (
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Verified</th>
                                    <th>Created At</th>
                                    <th>Likes</th>
                                    <th>Favorites</th>
                                    <th>Quotes</th>
                                    <th>Retweets</th>
                                    <th>Text</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((tweet) => (
                                    <tr key={tweet.id}>
                                        <td>{tweet.id}</td>
                                        <td>{tweet.screen_name ?? "—"}</td>
                                        <td>{tweet.verified ? "Yes" : "No"}</td>
                                        <td>{tweet.created_at ? new Date(tweet.created_at).toLocaleString() : "—"}</td>
                                        <td>{tweet.likes ?? 0}</td>
                                        <td>{tweet.favorites ?? 0}</td>
                                        <td>{tweet.quotes ?? 0}</td>
                                        <td>{tweet.retweets ?? 0}</td>
                                        <td style={{ maxWidth: 400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={tweet.text ?? ""}>
                                            {tweet.text ?? JSON.stringify(tweet)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        !isFetching && search && (!data || data.length === 0) && <p>No tweets found for "{search}".</p>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Tweets;
