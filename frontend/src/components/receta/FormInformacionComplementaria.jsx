function FormInformacionComplementaria({
    informacion,
    onChange
}) {

    return (

        <section className="form-seccion ficha-edicion">


            <table className="tabla-informacion-edicion">

                <tbody>


                    <tr>

                        <th>
                            Historia
                        </th>

                        <td>

                            <textarea
                                name="historia"
                                value={
                                    informacion.historia || ""
                                }
                                onChange={onChange}
                                rows={6}
                            />

                        </td>

                    </tr>



                    <tr>

                        <th>
                            Buenas prácticas de higiene
                        </th>

                        <td>

                            <textarea
                                name="buenas_practicas"
                                value={
                                    informacion.buenas_practicas || ""
                                }
                                onChange={onChange}
                                rows={6}
                            />

                        </td>

                    </tr>



                    <tr>

                        <th>
                            Conclusiones
                        </th>

                        <td>

                            <textarea
                                name="conclusiones"
                                value={
                                    informacion.conclusiones || ""
                                }
                                onChange={onChange}
                                rows={6}
                            />

                        </td>

                    </tr>



                    <tr>

                        <th>
                            Referencias bibliográficas
                        </th>

                        <td>

                            <textarea
                                name="referencias"
                                value={
                                    informacion.referencias || ""
                                }
                                onChange={onChange}
                                rows={6}
                            />

                        </td>

                    </tr>



                </tbody>


            </table>


        </section>

    );

}


export default FormInformacionComplementaria;