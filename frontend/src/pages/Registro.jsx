import RegistroForm from "../components/alumno/RegistroForm";

import "../assets/styles/login.css";

import chef from "../assets/images/login-chef.png";

function Registro() {

    return (

        <main className="login-page">

            <div className="login-container">

                <section className="login-banner">

                    <img
                        src={chef}
                        alt="Recetario"
                    />

                    <h2>

                        Organiza tu aprendizaje culinario

                    </h2>

                    <p>

                        Centraliza tus recetas, documenta tus prácticas de laboratorio,
                        administra ingredientes y genera automáticamente tu recetario
                        profesional en formato PDF.

                    </p>

                </section>

                <section className="login-card">

                    <div className="login-logo">

                        <h2>MISE EN TRACK</h2>

                        <span>

                            Sistema Inteligente de Gestión de Recetarios Gastronómicos

                        </span>

                    </div>

                    <h1>

                        Crear cuenta

                    </h1>

                    <p>

                        Registra una cuenta para comenzar a administrar tus recetarios.

                    </p>

                    <RegistroForm />

                </section>

            </div>

        </main>

    );

}

export default Registro;