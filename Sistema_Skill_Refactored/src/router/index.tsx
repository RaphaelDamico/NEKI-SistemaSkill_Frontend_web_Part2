import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import Private from "./Private";

function RoutesApp() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<RegisterPage />} />

            <Route path="/" element={<Private><HomePage /></Private>} />
        </Routes>
    );
}

export default RoutesApp;