import TarjetaRecetario from "./TarjetaRecetario";


function ListaRecetarios({

    recetarios = [],

    onEditar,

    onEliminar,

    onAbrir

}) {


    if (recetarios.length === 0) {

        return (

            <p>

                No tienes recetarios registrados.

            </p>

        );

    }



    return (

        <div className="lista-recetarios">


            {

                recetarios.map((recetario) => (

                    <TarjetaRecetario

                        key={
                            recetario.id_recetario
                        }

                        recetario={recetario}

                        onAbrir={onAbrir}

                        onEditar={onEditar}

                        onEliminar={onEliminar}

                    />

                ))

            }


        </div>

    );

}


export default ListaRecetarios;