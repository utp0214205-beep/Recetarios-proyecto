import FichaPagina1 from "./FichaPagina1";
import FichaPagina2 from "./FichaPagina2";

function FichaReceta({ receta }) {

    return (

        <div className="ficha-receta-completa">

            <FichaPagina1
                receta={receta}
            />

            <FichaPagina2
                receta={receta}
            />

        </div>

    );

}

export default FichaReceta;