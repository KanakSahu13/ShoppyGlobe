import { Link, useLocation } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    const location = useLocation();

    return (
        <section className="not-found">
            <p className="error-code">404</p>
            <h1>Page not found</h1>
            <p>The requested route does not exist.</p>
            <p className="requested-route">
                <strong>Requested path:</strong>
                {location.pathname}
            </p>
            <p className="requested-route">
                <strong>Error details:</strong>
                HTTP 404 - No matching ShoppyGlobe route was found.
            </p>
            <Link className="button-link" to="/">Return Home</Link>
        </section>
    )
}
export default NotFound;