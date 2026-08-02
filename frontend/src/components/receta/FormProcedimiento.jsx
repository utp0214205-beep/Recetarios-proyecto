function FormProcedimiento({
    procedimiento,
    onChange
}) {

    return (

        <section className="form-seccion ficha-edicion">


            <table className="tabla-procedimiento-edicion">

                <tbody>


                    <tr>

                        <th>
                            Mise en place
                        </th>

                        <td>

                            <textarea
                                name="mise_en_place"
                                value={
                                    procedimiento.mise_en_place || ""
                                }
                                onChange={onChange}
                                rows={6}
                            />

                        </td>

                    </tr>



                    <tr>

                        <th>
                            Procedimiento
                        </th>

                        <td>

                            <textarea
                                name="instrucciones"
                                value={
                                    procedimiento.instrucciones || ""
                                }
                                onChange={onChange}
                                rows={12}
                            />

                        </td>

                    </tr>



                </tbody>


            </table>


        </section>

    );

}


export default FormProcedimiento;