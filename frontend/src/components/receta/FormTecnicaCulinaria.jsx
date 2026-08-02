function FormTecnicaCulinaria({
    tecnica,
    onChange
}) {

    return (

        <section className="form-seccion ficha-edicion">


            <table className="tabla-tecnica-edicion">

                <tbody>


                    <tr>

                        <th>
                            Tipo de corte
                        </th>

                        <td>

                            <input
                                type="text"
                                name="tipo_corte"
                                value={
                                    tecnica.tipo_corte || ""
                                }
                                onChange={onChange}
                            />

                        </td>

                    </tr>



                    <tr>

                        <th>
                            Método de cocción
                        </th>

                        <td>

                            <input
                                type="text"
                                name="metodo_coccion"
                                value={
                                    tecnica.metodo_coccion || ""
                                }
                                onChange={onChange}
                            />

                        </td>

                    </tr>



                    <tr>

                        <th>
                            Técnica de elaboración
                        </th>

                        <td>

                            <textarea
                                name="tecnica_elaboracion"
                                value={
                                    tecnica.tecnica_elaboracion || ""
                                }
                                onChange={onChange}
                                rows={7}
                            />

                        </td>

                    </tr>



                </tbody>


            </table>


        </section>

    );

}


export default FormTecnicaCulinaria;