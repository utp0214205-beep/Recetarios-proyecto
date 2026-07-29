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
        📖 Recetario Digital
      </div>

      <div className="usuario">

        <span>
          {alumno?.nombre} {alumno?.apellido_paterno}
        </span>

        <button onClick={salir}>
          Cerrar sesión
        </button>

      </div>

    </header>
  );
}

export default Header;