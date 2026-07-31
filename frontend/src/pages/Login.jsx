import LoginForm from "../components/alumno/LoginForm";

import "../assets/styles/login.css";

import chef from "../assets/images/login-chef.png";

function Login() {

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

                      Iniciar sesión

                  </h1>

                  <p>

                      Ingresa con tu cuenta para administrar tus recetarios gastronómicos.

                  </p>

                  <LoginForm />

              </section>

            </div>

        </main>

    );

}

export default Login;