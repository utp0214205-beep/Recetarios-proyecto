function TarjetaRecetario({
    recetario,
    onEditar,
    onEliminar,
    onAbrir
}) {

    return (

        <div className="tarjeta-recetario">


            <div className="tarjeta-info">

                <h3>

                    {recetario.nombre}

                </h3>


                {
                    recetario.descripcion && (

                        <p>

                            {recetario.descripcion}

                        </p>

                    )
                }

            </div>





            <div className="tarjeta-acciones">


                {
                    onAbrir && (

                        <button

                            onClick={() =>
                                onAbrir(recetario)
                            }

                        >

                            Abrir

                        </button>

                    )
                }





                {
                    onEditar && (

                        <button

                            onClick={() =>
                                onEditar(recetario)
                            }

                        >

                            Editar

                        </button>

                    )
                }






                {
                    onEliminar && (

                        <button

                            onClick={() =>
                                onEliminar(
                                    recetario.id_recetario
                                )
                            }

                        >

                            Eliminar

                        </button>

                    )
                }



            </div>


        </div>

    );

}


export default TarjetaRecetario;