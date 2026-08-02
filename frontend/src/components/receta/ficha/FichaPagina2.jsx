import encabezadoFicha from "../../../assets/images/encabezado-ficha.png";

function FichaPagina2({ receta }) {

    const fotoPrincipal =
        receta.fotografias?.length > 0
            ? receta.fotografias[0].imagen
            : null;

    return (

    <section className="ficha-pagina">

        <header className="ficha-header">

            <img
                src={encabezadoFicha}
                alt="Encabezado"
                className="encabezado-ficha-img"
            />

        </header>

        <div className="contenido-ficha">

            <table className="tabla-procedimiento">

                <thead>

                    <tr>

                        <th className="titulo-verde">

                            TÉCNICAS DE PREPARACIÓN Y PROCEDIMIENTOS

                        </th>

                        <th className="titulo-verde montaje-header">

                            MONTAJE Y PRESENTACIÓN

                        </th>

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td className="celda-procedimiento">

                            <div className="bloque-procedimiento bloque-mise">

                                <strong>

                                    Mise en place

                                </strong>

                                <p>

                                    {receta.procedimiento?.mise_en_place}

                                </p>

                            </div>

                            <div className="bloque-procedimiento bloque-instrucciones">

                                <strong>

                                    Instrucciones

                                </strong>

                                <p>

                                    {receta.procedimiento?.instrucciones}

                                </p>

                            </div>

                            <table className="tabla-tecnicas">

                                <thead>

                                    <tr>

                                        <th
                                            className="titulo-verde"
                                            colSpan="2"
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

                                            {

                                                receta.tecnica_culinaria
                                                    ?.tipo_corte

                                            }

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Métodos de cocción

                                        </th>

                                        <td>

                                            {

                                                receta.tecnica_culinaria
                                                    ?.metodo_coccion

                                            }

                                        </td>

                                    </tr>

                                    <tr>

                                        <th>

                                            Técnicas de elaboración

                                        </th>

                                        <td>

                                            {

                                                receta.tecnica_culinaria
                                                    ?.tecnica_elaboracion

                                            }

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </td>

                        <td className="celda-foto">

                            {

                                fotoPrincipal ? (

                                    <img
                                        src={fotoPrincipal}
                                        alt={receta.nombre_platillo}
                                        className="foto-receta"
                                    />

                                ) : (

                                    <div className="sin-foto">

                                        Sin fotografía

                                    </div>

                                )

                            }

                        </td>

                    </tr>

                </tbody>

            </table>


                    <table className="tabla-equipo2">

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

                                <td
                                    rowSpan="2"
                                    className="celda-grande"
                                >

                                    {

                                        receta.equipo
                                            ?.utensilios

                                    }

                                </td>

                                <th>

                                    Cocción

                                </th>

                                <td>

                                    {

                                        receta.equipo
                                            ?.temperatura_coccion

                                    }

                                </td>

                                <td
                                    rowSpan="2"
                                    className="celda-grande"
                                >

                                    {

                                        receta.equipo
                                            ?.material_extra

                                    }

                                </td>

                                <td
                                    rowSpan="2"
                                    className="celda-grande"
                                >

                                    {

                                        receta.equipo
                                            ?.unidades_medicion

                                    }

                                </td>

                            </tr>

                            <tr>

                                <th>

                                    Servicio

                                </th>

                                <td>

                                    {

                                        receta.equipo
                                            ?.temperatura_servicio

                                    }

                                </td>

                            </tr>

                        </tbody>

                    </table>
                                    <table className="tabla-informacion">

                    <thead>

                        <tr>

                            <th>

                                HISTORIA / ORIGEN DEL PLATILLO

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td className="historia">

                                {

                                    receta.informacion_complementaria
                                        ?.historia

                                }

                            </td>

                        </tr>

                        <tr>

                            <th>

                                CONCLUSIONES

                            </th>

                        </tr>

                        <tr>

                            <td className="conclusiones">

                                {

                                    receta.informacion_complementaria
                                        ?.conclusiones

                                }

                            </td>

                        </tr>

                        <tr>

                            <th>

                                REFERENCIAS

                            </th>

                        </tr>

                        <tr>

                            <td className="referencias">

                                {

                                    receta.informacion_complementaria
                                        ?.referencias

                                }

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </section>

    );

}

export default FichaPagina2;