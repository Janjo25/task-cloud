import {Navigate, Outlet} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

/**
 * A route guard component that checks for user authentication.
 *
 * This component verifies the presence and validity of a JWT token in localStorage.
 * It decodes the token, checks if it has expired, and renders the matched child route via <Outlet /> if valid.
 * Otherwise, it removes the invalid token from storage and redirects the user to the login page.
 *
 * @component
 * @returns {JSX.Element} - The protected route content or a redirect to the login page.
 */
export default function RequireAuthentication() {
    const token = localStorage.getItem("authenticationToken");

    if (!token) return <Navigate to="/login"/>;

    try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem("authenticationToken");
            localStorage.removeItem("user");
            return <Navigate to="/login"/>;
        }
    } catch (ignored) {
        localStorage.removeItem("authenticationToken");
        localStorage.removeItem("user");
        return <Navigate to="/login"/>;
    }

    return <Outlet/>;
}
