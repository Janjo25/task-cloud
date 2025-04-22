import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import ErrorPage from "../pages/ErrorPage.jsx";
import FilePage from "../pages/FilePage.jsx";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import RequireAuthentication from "../authentication/RequireAuthentication.jsx";
import TasksPage from "../pages/TaskPage.jsx";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/error" element={<ErrorPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>

                <Route element={<RequireAuthentication/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/files" element={<FilePage/>}/>
                    <Route path="/tasks" element={<TasksPage/>}/>
                </Route>

                <Route path="*" element={<Navigate to="/error" state={{message: "La página que buscas no existe"}}/>}/>
            </Routes>
        </BrowserRouter>
    );
}
