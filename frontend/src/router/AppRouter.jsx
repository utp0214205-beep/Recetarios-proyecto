import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

function AppRouter() {

    return (

        <Routes>

            <Route path="/" element={<Login />} />

            <Route path="/registro" element={<Registro />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default AppRouter;