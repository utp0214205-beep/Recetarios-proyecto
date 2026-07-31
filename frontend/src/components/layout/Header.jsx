import { useAuth } from "../../hooks/useAuth";

function Header() {

    const { alumno, cerrarSesion } = useAuth();

    const salir = () => {

        cerrarSesion();

        window.location.href = "/";

    };

    return (

        <header className="header">

            <div className="logo">

                <div className="logo-icono">

                    🍴

                </div>

                <div className="logo-texto">

                    <h2>MISE EN TRACK</h2>

                    <span>
                        Sistema de Gestión Gastronómica
                    </span>

                </div>

            </div>

            <div className="usuario">

                <div className="usuario-info">

                    <strong>

                        {alumno?.nombre} {alumno?.apellido_paterno}

                    </strong>

                    <small>

                        Alumno

                    </small>

                </div>

                <button onClick={salir}>

                    Cerrar sesión

                </button>

            </div>

        </header>

    );

}

export default Header;