import BootstrapSpinner from "react-bootstrap/Spinner"
/**
 * A fully customized Spinner component based on react-bootstrap which is used to
 * indicate to a user that data is being retrieved over the network.
 * @returns A React JSX Element that can be rendered over the DOM. Spinner icon, full-height and width of container, 
 */
const Spinner = (): React.JSX.Element => {
    return (
        <div className="loading-spinner">
            <BootstrapSpinner variant="primary" role="status">
                <span className="visually-hidden">Loading data, this could take awhile</span>
            </BootstrapSpinner>
            <p>Loading (this can take awhile....)</p>
        </div>
    )
}

export default Spinner;