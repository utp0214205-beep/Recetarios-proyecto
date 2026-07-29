import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Recetarios from "./pages/Recetarios";
import Perfil from "./pages/Perfil";

import Login from "./pages/Login";
import Registro from "./pages/Registro";


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


            {/* Layout principal */}
            <Route element={<MainLayout />}>

                <Route 
                    path="/dashboard" 
                    element={<Dashboard />} 
                />

                <Route 
                    path="/recetarios" 
                    element={<Recetarios />} 
                />

                <Route 
                    path="/perfil" 
                    element={<Perfil />} 
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