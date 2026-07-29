import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

function MainLayout() {

    return (

        <div className="layout">

            <Header />

            <div className="contenido">

                <Sidebar />

                <main className="main">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default MainLayout;