import encabezadoFicha from "../../../assets/images/encabezado-ficha.png";


function FichaEdicionPagina2({

    datosReceta,

    actualizarProcedimiento,

    actualizarTecnica,

    actualizarEquipo,

    actualizarFotografias,

    actualizarInformacion

}) {


    return (

        <section className="ficha-pagina-edicion segunda-pagina">


            <header className="ficha-header">

                <img
                    src={encabezadoFicha}
                    alt="Encabezado"
                    className="encabezado-ficha-img"
                />

            </header>




            <div className="contenido-ficha-edicion">





                {/* PROCEDIMIENTO + FOTO */}


                <table className="tabla-procedimiento-edicion">


                    <thead>

                        <tr>


                            <th className="titulo-verde">

                                TÉCNICAS DE PREPARACIÓN Y PROCEDIMIENTOS

                            </th>



                            <th className="titulo-verde">

                                MONTAJE Y PRESENTACIÓN

                            </th>


                        </tr>


                    </thead>




                    <tbody>


                        <tr>



                            <td className="celda-procedimiento-edicion">



                                <strong>

                                    Mise en place

                                </strong>


                                <textarea

                                    name="mise_en_place"

                                    value={
                                        datosReceta
                                            .procedimiento
                                            ?.mise_en_place || ""
                                    }

                                    onChange={
                                        actualizarProcedimiento
                                    }

                                />




                                <strong>

                                    Instrucciones

                                </strong>


                                <textarea

                                    name="instrucciones"

                                    value={
                                        datosReceta
                                            .procedimiento
                                            ?.instrucciones || ""
                                    }

                                    onChange={
                                        actualizarProcedimiento
                                    }

                                />







                                <table className="tabla-tecnicas-edicion">


                                    <thead>

                                        <tr>

                                            <th
                                                colSpan="2"
                                                className="titulo-verde"
                                            >

                                                TÉCNICAS CULINARIAS

                                            </th>


                                        </tr>


                                    </thead>



                                    <tbody>


                                        <tr>


                                            <th>

                                                Tipos de corte

                                            </th>


                                            <td>


                                                <input

                                                    type="text"

                                                    name="tipo_corte"

                                                    value={
                                                        datosReceta
                                                            .tecnica_culinaria
                                                            ?.tipo_corte || ""
                                                    }

                                                    onChange={
                                                        actualizarTecnica
                                                    }

                                                />


                                            </td>


                                        </tr>





                                        <tr>


                                            <th>

                                                Métodos de cocción

                                            </th>


                                            <td>


                                                <input

                                                    type="text"

                                                    name="metodo_coccion"

                                                    value={
                                                        datosReceta
                                                            .tecnica_culinaria
                                                            ?.metodo_coccion || ""
                                                    }

                                                    onChange={
                                                        actualizarTecnica
                                                    }

                                                />


                                            </td>


                                        </tr>





                                        <tr>


                                            <th>

                                                Técnicas de elaboración

                                            </th>


                                            <td>


                                                <textarea

                                                    name="tecnica_elaboracion"

                                                    value={
                                                        datosReceta
                                                            .tecnica_culinaria
                                                            ?.tecnica_elaboracion || ""
                                                    }

                                                    onChange={
                                                        actualizarTecnica
                                                    }

                                                />


                                            </td>


                                        </tr>



                                    </tbody>


                                </table>



                            </td>







                            {/* FOTOGRAFIA */}



                            <td className="celda-foto-edicion">



                                <input

                                    type="file"

                                    accept="image/*"

                                    onChange={
                                        (e)=> {

                                            const archivo =
                                                e.target.files[0];


                                            if(!archivo)
                                                return;



                                            const reader =
                                                new FileReader();



                                            reader.onload = ()=> {


                                                actualizarFotografias([

                                                    {

                                                        imagen:
                                                            reader.result,

                                                        preview:
                                                            reader.result

                                                    }

                                                ]);


                                            };



                                            reader.readAsDataURL(
                                                archivo
                                            );


                                        }

                                    }

                                />





                                {

                                    datosReceta
                                        .fotografias
                                        ?.length > 0 && (


                                        <img

                                            src={
                                                datosReceta
                                                    .fotografias[0]
                                                    .preview
                                            }

                                            alt={
                                                datosReceta
                                                    .nombre_platillo
                                            }

                                            className="foto-receta-edicion"

                                        />


                                    )

                                }




                            </td>



                        </tr>



                    </tbody>



                </table>









                {/* EQUIPO */}



                <table className="tabla-equipo-edicion">


                    <thead>


                        <tr>


                            <th>

                                Utensilios

                            </th>


                            <th colSpan="2">

                                Temperaturas

                            </th>


                            <th>

                                Material extra que el alumno debe traer

                            </th>


                            <th>

                                Unidades de medición

                            </th>


                        </tr>


                    </thead>




                    <tbody>



                        <tr>


                            <td rowSpan="2">


                                <textarea

                                    name="utensilios"

                                    value={
                                        datosReceta
                                            .equipo
                                            ?.utensilios || ""
                                    }

                                    onChange={
                                        actualizarEquipo
                                    }

                                />

                            </td>





                            <th>

                                Cocción

                            </th>


                            <td>


                                <input

                                    type="text"

                                    name="temperatura_coccion"

                                    value={
                                        datosReceta
                                            .equipo
                                            ?.temperatura_coccion || ""
                                    }

                                    onChange={
                                        actualizarEquipo
                                    }

                                />


                            </td>





                            <td rowSpan="2">


                                <textarea

                                    name="material_extra"

                                    value={
                                        datosReceta
                                            .equipo
                                            ?.material_extra || ""
                                    }

                                    onChange={
                                        actualizarEquipo
                                    }


                                />


                            </td>





                            <td rowSpan="2">


                                <textarea

                                    name="unidades_medicion"

                                    value={
                                        datosReceta
                                            .equipo
                                            ?.unidades_medicion || ""
                                    }

                                    onChange={
                                        actualizarEquipo
                                    }


                                />


                            </td>



                        </tr>





                        <tr>


                            <th>

                                Servicio

                            </th>


                            <td>


                                <input

                                    type="text"

                                    name="temperatura_servicio"

                                    value={
                                        datosReceta
                                            .equipo
                                            ?.temperatura_servicio || ""
                                    }

                                    onChange={
                                        actualizarEquipo
                                    }


                                />


                            </td>


                        </tr>




                    </tbody>


                </table>









                {/* INFORMACION FINAL */}



                <table className="tabla-informacion-edicion">


                    <tbody>



                        <tr>


                            <th>

                                HISTORIA / ORIGEN DEL PLATILLO

                            </th>


                        </tr>



                        <tr>


                            <td>


                                <textarea

                                    name="historia"

                                    value={
                                        datosReceta
                                            .informacion_complementaria
                                            ?.historia || ""
                                    }

                                    onChange={
                                        actualizarInformacion
                                    }

                                />


                            </td>


                        </tr>





                        <tr>


                            <th>

                                CONCLUSIONES

                            </th>


                        </tr>



                        <tr>


                            <td>


                                <textarea

                                    name="conclusiones"

                                    value={
                                        datosReceta
                                            .informacion_complementaria
                                            ?.conclusiones || ""
                                    }

                                    onChange={
                                        actualizarInformacion
                                    }


                                />


                            </td>


                        </tr>







                        <tr>


                            <th>

                                REFERENCIAS

                            </th>


                        </tr>



                        <tr>


                            <td>


                                <textarea

                                    name="referencias"

                                    value={
                                        datosReceta
                                            .informacion_complementaria
                                            ?.referencias || ""
                                    }

                                    onChange={
                                        actualizarInformacion
                                    }


                                />


                            </td>


                        </tr>




                    </tbody>


                </table>





            </div>


        </section>

    );

}


export default FichaEdicionPagina2;