import { createContext, useState } from "react";


export const AuthContext = createContext();



function AuthProvider({ children }) {


    const [alumno, setAlumno] = useState(() => {

        const datos = localStorage.getItem("alumno");

        return datos 
            ? JSON.parse(datos) 
            : null;

    });





    const iniciarSesion = (datosAlumno) => {


        localStorage.setItem(
            "alumno",
            JSON.stringify(datosAlumno)
        );


        setAlumno(datosAlumno);


    };





    const cerrarSesion = () => {


        localStorage.removeItem("alumno");


        setAlumno(null);


    };





    const autenticado = () => {

        return !!alumno;

    };





    return (

        <AuthContext.Provider

            value={{

                alumno,

                iniciarSesion,

                cerrarSesion,

                autenticado

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}



export default AuthProvider;