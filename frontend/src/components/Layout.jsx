import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children }) {

    return (

        <div className="layout">

            <Header />

            <div className="contenido">

                <Sidebar />

                <main className="main">
                    {children}
                </main>

            </div>

        </div>

    );

}

export default Layout;