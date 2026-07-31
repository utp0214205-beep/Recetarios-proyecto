function DetalleDatosGenerales({ receta }) {

    return (

        <section className="datos-generales">

            <h2>

                Datos generales

            </h2>

            <div className="grid-datos">

                <div>

                    <strong>Asignatura</strong>

                    <p>{receta.asignatura}</p>

                </div>

                <div>

                    <strong>FECHA PRUEBA</strong>

                    <p>
                        {
                            receta.fecha
                                ? new Date(receta.fecha).toLocaleDateString("es-MX")
                                : ""
                        }
                    </p>

                </div>

                <div>

                    <strong>Práctica</strong>

                    <p>{receta.numero_practica}</p>

                </div>

                <div>

                    <strong>Tiempo</strong>

                    <p>{receta.tiempo_preparacion}</p>

                </div>

                <div>

                    <strong>Total producción</strong>

                    <p>{receta.total_produccion}</p>

                </div>

                <div>

                    <strong>Porciones</strong>

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

            </div>

        </section>

    );

}

export default DetalleDatosGenerales;