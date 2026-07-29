import CardRecetario from "./CardRecetario";

function ListaRecetarios({ recetarios = [] }) {

    if (recetarios.length === 0) {
        return (
            <p>Aún no tienes recetarios creados.</p>
        );
    }

    return (
        <div className="lista-recetarios">

            {recetarios.map((recetario) => (
                <CardRecetario
                    key={recetario.id_recetario}
                    recetario={recetario}
                />
            ))}

        </div>
    );
}

export default ListaRecetarios;