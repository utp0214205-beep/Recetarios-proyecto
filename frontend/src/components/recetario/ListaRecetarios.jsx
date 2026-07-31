import TarjetaRecetario from "./TarjetaRecetario";


function ListaRecetarios({

    recetarios = [],

    onEditar,

    onEliminar,

    onAbrir

}) {


    if(recetarios.length===0){

        return(

            <div className="sin-recetarios">

                <h2>

                    📚

                </h2>

                <p>

                    Aún no has creado ningún recetario.

                </p>

                <span>

                    Presiona "Nuevo Recetario" para comenzar.

                </span>

            </div>

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