import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import LoginPage from "../pages/LoginPage.jsx";
import RequireAuthentication from "../components/RequireAuthentication.jsx";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>

                <Route element={<RequireAuthentication/>}>
                    {/* TODO: Add private routes. */}
                </Route>

                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </BrowserRouter>
    );
}
