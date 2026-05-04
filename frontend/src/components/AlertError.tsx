import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

type AlertErrorProps = {
    error?: Error;
};

/**
 * Displays an error using the Bootstrap alert component.
 * @param error an error object which will be used to pass in the display text
 */
const AlertError = ({ error }: AlertErrorProps): React.JSX.Element => {
    return (
        <Container className="mt-4">
            <Alert variant="danger">
                {error ? error.message : 'An unknown error occurred.'}
            </Alert>
        </Container>
    )
}

export default AlertError; 