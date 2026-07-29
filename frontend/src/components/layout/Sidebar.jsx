import { NavLink } from "react-router-dom";

function Sidebar() {

    return (

        <aside className="sidebar">

            <NavLink to="/dashboard">
                Dashboard
            </NavLink>

            <NavLink to="/recetarios">
                Recetarios
            </NavLink>

            <NavLink to="/perfil">
                Perfil
            </NavLink>

        </aside>

    );

}

export default Sidebar;