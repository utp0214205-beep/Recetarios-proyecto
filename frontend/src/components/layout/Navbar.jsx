import { useAuth } from "../../hooks/useAuth";

function Navbar() {

    const { alumno } = useAuth();

    return (

        <header className="navbar">

            <h2>Recetario Digital</h2>

            <span>

                {alumno?.nombre}

            </span>

        </header>

    );

}

export default Navbar;