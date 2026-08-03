import { useRef } from "react";

import FichaPagina1 from "./FichaPagina1";
import FichaPagina2 from "./FichaPagina2";

function FichaReceta({ receta }) {

    const pagina1Ref = useRef(null);
    const pagina2Ref = useRef(null);

    return (

        <div className="ficha-receta-completa">

            <div ref={pagina1Ref}>

                <FichaPagina1
                    receta={receta}
                />

            </div>

            <div ref={pagina2Ref}>

                <FichaPagina2
                    receta={receta}
                />

            </div>

        </div>

    );

}

export default FichaReceta;