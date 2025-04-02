import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import RequireAuthentication from "../components/RequireAuthentication.jsx";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* TODO: Add public routes. */}

                <Route element={<RequireAuthentication/>}>
                    {/* TODO: Add private routes. */}
                </Route>

                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </BrowserRouter>
    );
}
