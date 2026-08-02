function FormEquipo({
    equipo,
    onChange
}) {

    return (

        <section className="form-seccion ficha-edicion">


            <table className="tabla-equipo-edicion">

                <tbody>


                    <tr>

                        <th>
                            Utensilios
                        </th>

                        <td>

                            <textarea
                                name="utensilios"
                                value={
                                    equipo.utensilios || ""
                                }
                                onChange={onChange}
                                rows={5}
                            />

                        </td>

                    </tr>



                    <tr>

                        <th>
                            Temperatura de cocción
                        </th>

                        <td>

                            <input
                                type="text"
                                name="temperatura_coccion"
                                value={
                                    equipo.temperatura_coccion || ""
                                }
                                onChange={onChange}
                            />

                        </td>

                    </tr>



                    <tr>

                        <th>
                            Temperatura de servicio
                        </th>

                        <td>

                            <input
                                type="text"
                                name="temperatura_servicio"
                                value={
                                    equipo.temperatura_servicio || ""
                                }
                                onChange={onChange}
                            />

                        </td>

                    </tr>



                    <tr>

                        <th>
                            Material extra
                        </th>

                        <td>

                            <textarea
                                name="material_extra"
                                value={
                                    equipo.material_extra || ""
                                }
                                onChange={onChange}
                                rows={4}
                            />

                        </td>

                    </tr>



                    <tr>

                        <th>
                            Unidades de medición
                        </th>

                        <td>

                            <textarea
                                name="unidades_medicion"
                                value={
                                    equipo.unidades_medicion || ""
                                }
                                onChange={onChange}
                                rows={4}
                            />

                        </td>

                    </tr>



                </tbody>


            </table>


        </section>

    );

}


export default FormEquipo;