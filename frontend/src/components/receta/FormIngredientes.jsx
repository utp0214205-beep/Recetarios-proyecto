function FormIngredientes({
    ingredientes,
    setIngredientes
}) {


    const FILAS = 17;



    const cambiarIngrediente = (
        index,
        campo,
        valor
    ) => {


        const nuevos = [...ingredientes];


        nuevos[index][campo] = valor;



        if (
            campo === "cantidad" ||
            campo === "costo_unitario"
        ) {


            const cantidad =
                Number(nuevos[index].cantidad) || 0;


            const costo =
                Number(nuevos[index].costo_unitario) || 0;



            nuevos[index].importe =
                (cantidad * costo).toFixed(2);


        }



        setIngredientes(nuevos);


    };




    const agregarFila = () => {


        setIngredientes([

            ...ingredientes,

            {
                nombre: "",
                cantidad: "",
                unidad: "",
                costo_unitario: "",
                rendimiento: "",
                importe: ""
            }

        ]);


    };




    const eliminarIngrediente = (index) => {


        const nuevos = ingredientes.filter(

            (_, i) => i !== index

        );


        setIngredientes(nuevos);


    };




    const filasVacias = Math.max(

        0,

        FILAS - ingredientes.length

    );




    return (


        <section className="form-seccion ficha-edicion">



            <table className="tabla-ingredientes-edicion">



                <thead>


                    <tr>


                        <th>
                            CANT.
                        </th>


                        <th>
                            UNIDAD
                        </th>


                        <th>
                            MATERIA PRIMA
                        </th>


                        <th>
                            COSTO UNITARIO
                        </th>


                        <th>
                            % DE RENDIMIENTO
                        </th>


                        <th>
                            IMPORTE
                        </th>


                    </tr>


                </thead>




                <tbody>



                    {
                        ingredientes.map(

                            (ingrediente,index)=>(


                                <tr key={index}>


                                    <td>


                                        <input

                                            type="number"

                                            value={
                                                ingrediente.cantidad || ""
                                            }

                                            onChange={(e)=>

                                                cambiarIngrediente(

                                                    index,

                                                    "cantidad",

                                                    e.target.value

                                                )

                                            }

                                        />


                                    </td>





                                    <td>


                                        <input

                                            type="text"

                                            value={
                                                ingrediente.unidad || ""
                                            }

                                            onChange={(e)=>

                                                cambiarIngrediente(

                                                    index,

                                                    "unidad",

                                                    e.target.value

                                                )

                                            }

                                        />


                                    </td>





                                    <td>


                                        <input

                                            type="text"

                                            value={
                                                ingrediente.nombre || ""
                                            }

                                            onChange={(e)=>

                                                cambiarIngrediente(

                                                    index,

                                                    "nombre",

                                                    e.target.value

                                                )

                                            }

                                        />


                                    </td>





                                    <td>


                                        <input

                                            type="number"

                                            step="0.01"

                                            value={
                                                ingrediente.costo_unitario || ""
                                            }

                                            onChange={(e)=>

                                                cambiarIngrediente(

                                                    index,

                                                    "costo_unitario",

                                                    e.target.value

                                                )

                                            }

                                        />


                                    </td>





                                    <td>


                                        <input

                                            type="text"

                                            value={
                                                ingrediente.rendimiento || ""
                                            }

                                            onChange={(e)=>

                                                cambiarIngrediente(

                                                    index,

                                                    "rendimiento",

                                                    e.target.value

                                                )

                                            }

                                        />


                                    </td>





                                    <td className="celda-importe">


                                        <input

                                            type="text"

                                            value={
                                                ingrediente.importe
                                                    ? `$ ${ingrediente.importe}`
                                                    : ""
                                            }

                                            readOnly

                                        />



                                        <button

                                            type="button"

                                            className="btn-eliminar-fila"

                                            onClick={()=>

                                                eliminarIngrediente(index)

                                            }

                                        >

                                            ×

                                        </button>



                                    </td>



                                </tr>


                            )

                        )
                    }





                    {
                        Array.from({

                            length: filasVacias

                        }).map((_,i)=>(


                            <tr key={`vacia-${i}`}>



                                <td></td>

                                <td></td>

                                <td></td>

                                <td></td>

                                <td></td>

                                <td></td>



                            </tr>


                        ))
                    }




                </tbody>




            </table>





            <button

                type="button"

                className="btn-agregar-fila"

                onClick={agregarFila}

            >

                + Agregar ingrediente

            </button>




        </section>


    );


}


export default FormIngredientes;