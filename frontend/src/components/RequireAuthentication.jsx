import {Navigate, Outlet} from "react-router-dom";

/**
 * A route guard component that checks for user authentication.
 *
 * This component verifies the presence of a JWT token in localStorage.
 * If a valid token is found, it renders the matched child route via <Outlet />.
 * Otherwise, it redirects the user to the login page using <Navigate />.
 *
 * @component
 * @returns {JSX.Element} - The protected route content or a redirect to the login page.
 */
export default function RequireAuthentication() {
    const token = localStorage.getItem("authenticationToken");
    return token ? <Outlet/> : <Navigate to="/login"/>;
}
