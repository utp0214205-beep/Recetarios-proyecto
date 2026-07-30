import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { obtenerDetalleReceta } from "../services/recetaService";
import "../assets/styles/detalleReceta.css";

import DetalleCabecera from "../components/receta/detalle/DetalleCabecera";
import DetalleDatosGenerales from "../components/receta/detalle/DetalleDatosGenerales";
import DetalleIngredientes from "../components/receta/detalle/DetalleIngredientes";

function DetalleReceta() {

    const { idRecetario, idReceta } = useParams();

    const navigate = useNavigate();

    const [receta, setReceta] = useState(null);

    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        cargarReceta();

    }, []);

    const cargarReceta = async () => {

        try {

            const data = await obtenerDetalleReceta(
                idRecetario,
                idReceta
            );

            setReceta(data);

        } catch (error) {

            console.error(error);

        } finally {

            setCargando(false);

        }

    };

    if (cargando) {

        return <h2>Cargando receta...</h2>;

    }

    if (!receta) {

        return <h2>No existe la receta.</h2>;

    }

    return (

        <div className="detalle-receta">

            <header className="detalle-header">

                <h1>
                    {receta.nombre_platillo}
                </h1>

                <button
                    onClick={() => navigate(-1)}
                >
                    ← Regresar
                </button>

            </header>

            {/* ================= DATOS GENERALES ================= */}

            <section className="card-seccion">

                <h2>Datos generales</h2>

                <div className="grid-datos">

                    <div>
                        <strong>Asignatura</strong>
                        <p>{receta.asignatura}</p>
                    </div>

                    <div>
                        <strong>Clasificación</strong>
                        <p>{receta.clasificacion}</p>
                    </div>

                    <div>
                        <strong>Fecha</strong>
                        <p>{receta.fecha}</p>
                    </div>

                    <div>
                        <strong>Número de práctica</strong>
                        <p>{receta.numero_practica}</p>
                    </div>

                    <div>
                        <strong>Tiempo de preparación</strong>
                        <p>{receta.tiempo_preparacion}</p>
                    </div>

                    <div>
                        <strong>Total producción</strong>
                        <p>{receta.total_produccion}</p>
                    </div>

                    <div>
                        <strong>Número de porciones</strong>
                        <p>{receta.numero_porciones}</p>
                    </div>

                    <div>
                        <strong>Cantidad por porción</strong>
                        <p>{receta.cantidad_porcion}</p>
                    </div>

                    <div>
                        <strong>Aporte nutrimental</strong>
                        <p>{receta.aporte_nutrimental}</p>
                    </div>

                    <div>
                        <strong>Conservación</strong>
                        <p>{receta.metodo_tiempo_conservacion}</p>
                    </div>

                    <div>
                        <strong>Maridaje</strong>
                        <p>{receta.maridaje}</p>
                    </div>

                    <div>
                        <strong>Costo total</strong>
                        <p>${receta.costo_total}</p>
                    </div>

                    <div>
                        <strong>Costo por porción</strong>
                        <p>${receta.costo_por_porcion}</p>
                    </div>

                </div>

            </section>

            {/* ================= INGREDIENTES ================= */}

            <section className="card-seccion">

                <h2>Ingredientes</h2>

                <table className="tabla-ingredientes">

                    <thead>

                        <tr>

                            <th>Ingrediente</th>
                            <th>Cantidad</th>
                            <th>Unidad</th>
                            <th>Costo</th>
                            <th>Rendimiento</th>
                            <th>Importe</th>

                        </tr>

                    </thead>

                    <tbody>

                        {receta.ingredientes.map((i) => (

                            <tr key={i.id_ingrediente_receta}>

                                <td>{i.nombre}</td>

                                <td>{i.cantidad}</td>

                                <td>{i.unidad}</td>

                                <td>{i.costo_unitario}</td>

                                <td>{i.rendimiento}</td>

                                <td>{i.importe}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </section>

            {/* ================= PROCEDIMIENTO ================= */}

            <section className="card-seccion">

                <h2>Procedimiento</h2>

                <h3>Mise en place</h3>

                <p>

                    {receta.procedimiento?.mise_en_place}

                </p>

                <h3>Instrucciones</h3>

                <p>

                    {receta.procedimiento?.instrucciones}

                </p>

            </section>

            {/* ================= TÉCNICA ================= */}

            <section className="card-seccion">

                <h2>Técnica culinaria</h2>

                <p>

                    <strong>Tipo de corte:</strong>{" "}
                    {receta.tecnica_culinaria?.tipo_corte}

                </p>

                <p>

                    <strong>Método de cocción:</strong>{" "}
                    {receta.tecnica_culinaria?.metodo_coccion}

                </p>

                <p>

                    <strong>Técnica:</strong>{" "}
                    {receta.tecnica_culinaria?.tecnica_elaboracion}

                </p>

            </section>

            {/* ================= EQUIPO ================= */}

            <section className="card-seccion">

                <h2>Equipo</h2>

                <p>

                    <strong>Utensilios:</strong>{" "}
                    {receta.equipo?.utensilios}

                </p>

                <p>

                    <strong>Temperatura cocción:</strong>{" "}
                    {receta.equipo?.temperatura_coccion}

                </p>

                <p>

                    <strong>Temperatura servicio:</strong>{" "}
                    {receta.equipo?.temperatura_servicio}

                </p>

                <p>

                    <strong>Material extra:</strong>{" "}
                    {receta.equipo?.material_extra}

                </p>

                <p>

                    <strong>Unidades de medición:</strong>{" "}
                    {receta.equipo?.unidades_medicion}

                </p>

            </section>

            {/* ================= FOTOGRAFÍAS ================= */}

            <section className="card-seccion">

                <h2>Fotografías</h2>

                <div className="galeria">

                    {receta.fotografias?.map((foto) => (

                        <img

                            key={foto.id_fotografia}

                            src={foto.imagen}

                            alt="Fotografía"

                        />

                    ))}

                </div>

            </section>

            {/* ================= INFORMACIÓN ================= */}

            <section className="card-seccion">

                <h2>Información complementaria</h2>

                <h3>Historia</h3>

                <p>

                    {receta.informacion_complementaria?.historia}

                </p>

                <h3>Conclusiones</h3>

                <p>

                    {receta.informacion_complementaria?.conclusiones}

                </p>

                <h3>Buenas prácticas</h3>

                <p>

                    {receta.informacion_complementaria?.buenas_practicas}

                </p>

                <h3>Referencias</h3>

                <p>

                    {receta.informacion_complementaria?.referencias}

                </p>

            </section>

        </div>

    );
    }

export default DetalleReceta;