function FormDatosGenerales({
    datos,
    onChange
}) {

    return (

        <section className="form-seccion ficha-edicion">

            <table className="tabla-datos-edicion">

                <tbody>

                    <tr>

                        <th>
                            Asignatura
                        </th>

                        <td>

                            <input
                                type="text"
                                name="asignatura"
                                value={datos.asignatura}
                                onChange={onChange}
                            />

                        </td>

                        <th>
                            Clasificación
                        </th>

                        <td>

                            <input
                                type="text"
                                name="clasificacion"
                                value={datos.clasificacion}
                                onChange={onChange}
                            />

                        </td>

                    </tr>

                    <tr>

                        <th>
                            Nombre de la receta/platillo
                        </th>

                        <td>

                            <input
                                type="text"
                                name="nombre_platillo"
                                value={datos.nombre_platillo}
                                onChange={onChange}
                                required
                            />

                        </td>

                        <th>
                            Número de práctica
                        </th>

                        <td>

                            <input
                                type="number"
                                name="numero_practica"
                                value={datos.numero_practica}
                                onChange={onChange}
                            />

                        </td>

                    </tr>

                    <tr>

                        <th>
                            Fecha
                        </th>

                        <td>

                            <input
                                type="date"
                                name="fecha"
                                value={datos.fecha}
                                onChange={onChange}
                            />

                        </td>

                        <th>
                            Tiempo de preparación
                        </th>

                        <td>

                            <input
                                type="text"
                                name="tiempo_preparacion"
                                value={datos.tiempo_preparacion}
                                onChange={onChange}
                            />

                        </td>

                    </tr>

                    <tr>

                        <th>
                            Total de la producción en Kg/L
                        </th>

                        <td>

                            <input
                                type="text"
                                name="total_produccion"
                                value={datos.total_produccion}
                                onChange={onChange}
                            />

                        </td>

                        <th>
                            Aporte nutrimental en kcal/porción
                        </th>

                        <td>

                            <input
                                type="text"
                                name="aporte_nutrimental"
                                value={datos.aporte_nutrimental}
                                onChange={onChange}
                            />

                        </td>

                    </tr>

                    <tr>

                        <th>
                            Número de porciones
                        </th>

                        <td>

                            <input
                                type="number"
                                name="numero_porciones"
                                value={datos.numero_porciones}
                                onChange={onChange}
                            />

                        </td>

                        <th>
                            Método y tiempo de conservación
                        </th>

                        <td>

                            <input
                                type="text"
                                name="metodo_tiempo_conservacion"
                                value={datos.metodo_tiempo_conservacion}
                                onChange={onChange}
                            />

                        </td>

                    </tr>

                    <tr>

                        <th>
                            Cantidad por porción en Kg/L
                        </th>

                        <td>

                            <input
                                type="text"
                                name="cantidad_porcion"
                                value={datos.cantidad_porcion}
                                onChange={onChange}
                            />

                        </td>

                        <th>
                            Maridaje recomendado
                        </th>

                        <td>

                            <input
                                type="text"
                                name="maridaje"
                                value={datos.maridaje}
                                onChange={onChange}
                            />

                        </td>

                    </tr>

                </tbody>

            </table>

            

        </section>

    );

}

export default FormDatosGenerales;