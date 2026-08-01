import encabezadoFicha from "../../../assets/images/encabezado-ficha.png";
function FichaPagina1({ receta }) {
    const ingredientes = receta.ingredientes || [];

    const FILAS = 17;

    const filasVacias = Math.max(
        0,
        FILAS - ingredientes.length
    );

    return (

        <section className="ficha-pagina">

            <header className="ficha-header">

                <img
                    src={encabezadoFicha}
                    alt="Encabezado"
                    className="encabezado-ficha-img"
                />

            </header>


            <table className="tabla-datos">

                <tbody>

                    <tr>
                        <th>Asignatura</th>
                        <td>{receta.asignatura}</td>

                        <th>Clasificación</th>
                        <td>{receta.clasificacion}</td>
                    </tr>

                    <tr>
                        <th>Nombre del platillo</th>
                        <td>{receta.nombre_platillo}</td>

                        <th>Número de práctica</th>
                        <td>{receta.numero_practica}</td>
                    </tr>

                    <tr>
                        <th>Fecha</th>
                        <td>{
                            receta.fecha
                                ? new Date(receta.fecha).toLocaleDateString("es-MX")
                                : ""
                        }</td>

                        <th>Tiempo preparación</th>
                        <td>{receta.tiempo_preparacion}</td>
                    </tr>

                    <tr>
                        <th>Total producción</th>
                        <td>{receta.total_produccion}</td>

                        <th>Aporte nutrimental</th>
                        <td>{receta.aporte_nutrimental}</td>
                    </tr>

                    <tr>
                        <th>Porciones</th>
                        <td>{receta.numero_porciones}</td>

                        <th>Conservación</th>
                        <td>{receta.metodo_tiempo_conservacion}</td>
                    </tr>

                    <tr>
                        <th>Cantidad por porción</th>
                        <td>{receta.cantidad_porcion}</td>

                        <th>Maridaje</th>
                        <td>{receta.maridaje}</td>
                    </tr>

                </tbody>

            </table>


            <div className="contenedor-ingredientes">

                <table className="tabla-ingredientes">

                <thead>

                    <tr>

                        <th>CANT.</th>

                        <th>UNIDAD</th>

                        <th>MATERIA PRIMA</th>

                        <th>COSTO UNITARIO</th>

                        <th>% DE RENDIMIENTO</th>

                        <th>IMPORTE</th>

                    </tr>

                </thead>

                <tbody>

                    {ingredientes.map((item) => (

                        <tr key={item.id_ingrediente_receta}>

                            <td>{item.cantidad}</td>

                            <td>{item.unidad}</td>

                            <td>{item.nombre}</td>

                            <td>

                                {item.costo_unitario
                                    ? `$ ${Number(item.costo_unitario).toFixed(2)}`
                                    : ""}

                            </td>

                            <td>

                                {item.rendimiento
                                    ? `${item.rendimiento}%`
                                    : ""}

                            </td>

                            <td>

                                {item.importe
                                    ? `$ ${Number(item.importe).toFixed(2)}`
                                    : ""}

                            </td>

                        </tr>

                    ))}

                    {Array.from({ length: filasVacias }).map((_, i) => (

                        <tr key={`vacia-${i}`}>

                            <td>&nbsp;</td>

                            <td></td>

                            <td></td>

                            <td></td>

                            <td></td>

                            <td></td>

                        </tr>

                    ))}

                </tbody>

                </table>

            </div>


            <div className="pie-pagina1">

                <div>

                    <strong>

                        Buenas Prácticas de Higiene:

                    </strong>

                    <p>

                        {receta.informacion_complementaria?.buenas_practicas}

                    </p>

                </div>

                <div>

                    <table className="tabla-costos">

                        <tbody>

                            <tr>

                                <th>

                                    Costo de insumos de la receta:

                                </th>

                                <td>

                                    $

                                    {

                                        Number(
                                            receta.costo_total || 0
                                        ).toFixed(2)

                                    }

                                </td>

                            </tr>

                            <tr>

                                <th>

                                    Costo de insumos por porción:

                                </th>

                                <td>

                                    $

                                    {

                                        Number(
                                            receta.costo_por_porcion || 0
                                        ).toFixed(2)

                                    }

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </section>

    );

}

export default FichaPagina1;