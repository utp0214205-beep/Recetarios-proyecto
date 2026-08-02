import encabezadoFicha from "../../../assets/images/encabezado-ficha.png";

import FormDatosGenerales from "../FormDatosGenerales";
import FormIngredientes from "../FormIngredientes";


function FichaEdicionPagina1({

    datosReceta,

    manejarCambio,

    actualizarIngredientes,

    actualizarInformacion

}) {


    return (

        <section className="ficha-pagina-edicion">


            <header className="ficha-header">

                <img
                    src={encabezadoFicha}
                    alt="Encabezado"
                    className="encabezado-ficha-img"
                />

            </header>



            <div className="contenido-ficha-edicion">



                {/* DATOS GENERALES */}

                <FormDatosGenerales

                    datos={datosReceta}

                    onChange={manejarCambio}

                />





                {/* INGREDIENTES */}

                <FormIngredientes

                    ingredientes={
                        datosReceta.ingredientes
                    }

                    setIngredientes={
                        actualizarIngredientes
                    }

                />





                {/* PIE DE PAGINA */}

                <div className="pie-pagina-edicion">



                    {/* BUENAS PRACTICAS */}

                    <table className="tabla-buenas-practicas-edicion">


                        <thead>

                            <tr>

                                <th>

                                    BUENAS PRÁCTICAS DE HIGIENE

                                </th>

                            </tr>

                        </thead>



                        <tbody>

                            <tr>

                                <td>


                                    <textarea

                                        name="buenas_practicas"


                                        value={
                                            datosReceta
                                                .informacion_complementaria
                                                ?.buenas_practicas || ""
                                        }


                                        onChange={
                                            actualizarInformacion
                                        }


                                    />


                                </td>

                            </tr>


                        </tbody>


                    </table>





                    {/* COSTOS */}

                    <table className="tabla-costos-edicion">


                        <tbody>


                            <tr>


                                <th>

                                    Costo de insumos de la receta

                                </th>



                                <td>


                                    <input

                                        type="number"

                                        step="0.01"

                                        name="costo_total"


                                        value={
                                            datosReceta.costo_total || ""
                                        }


                                        onChange={
                                            manejarCambio
                                        }


                                    />


                                </td>


                            </tr>




                            <tr>


                                <th>

                                    Costo de insumos por porción

                                </th>



                                <td>


                                    <input

                                        type="number"

                                        step="0.01"

                                        name="costo_por_porcion"


                                        value={
                                            datosReceta.costo_por_porcion || ""
                                        }


                                        onChange={
                                            manejarCambio
                                        }


                                    />


                                </td>


                            </tr>



                        </tbody>


                    </table>



                </div>



            </div>


        </section>

    );

}


export default FichaEdicionPagina1;