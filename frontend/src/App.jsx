import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./router/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Recetarios from "./pages/Recetarios";
import Perfil from "./pages/Perfil";
import RecetarioDetalle from "./pages/RecetarioDetalle";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import NuevaReceta from "./pages/NuevaReceta";
import DetalleReceta from "./pages/DetalleReceta";

function App() {

    return (

        <Routes>

            {/* Redirección inicial */}
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            {/* Rutas públicas */}
            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/registro"
                element={<Registro />}
            />

            {/* Rutas protegidas */}
            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/recetarios"
                    element={<Recetarios />}
                />

                <Route
                    path="/recetarios/:id"
                    element={<RecetarioDetalle />}
                />

                <Route
                    path="/recetarios/:id/nueva-receta"
                    element={<NuevaReceta />}
                />

                <Route
                    path="/recetarios/:idRecetario/recetas/:idReceta"
                    element={<DetalleReceta />}
                />

                <Route
                    path="/perfil"
                    element={<Perfil />}
                />
                
                <Route
                    path="/recetarios/:idRecetario/recetas/:idReceta/editar"
                    element={<NuevaReceta />}
                />

            </Route>

            {/* Ruta desconocida */}
            <Route
                path="*"
                element={<Navigate to="/dashboard" replace />}
            />

        </Routes>

    );

}

export default App;