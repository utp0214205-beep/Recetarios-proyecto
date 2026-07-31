function FormFotografias({
    fotografias,
    setFotografias
}) {

    const listaFotografias = Array.isArray(fotografias)
        ? fotografias
        : [];


    const seleccionarImagen = (e) => {

        const archivo = e.target.files[0];

        if (!archivo) return;


        const reader = new FileReader();


        reader.onload = () => {

            setFotografias([

                {
                    imagen: reader.result,
                    preview: reader.result
                }

            ]);

        };


        reader.readAsDataURL(archivo);

    };


    const eliminarFotografia = (index) => {

        setFotografias(

            fotografias.filter(
                (_, i) => i !== index
            )

        );

    };


    return (

        <section className="form-seccion">

            <h2>Fotografía de la receta</h2>


            <input
                type="file"
                accept="image/*"
                onChange={seleccionarImagen}
            />

            {
                listaFotografias.length > 0 && (

                    <div className="galeria-fotos">

                        {
                            listaFotografias.map(
                                (foto, index) => (

                                <div
                                    className="foto-item"
                                    key={
                                        foto.id_fotografia
                                            ? foto.id_fotografia
                                            : index
                                    }
                                >

                                    <img
                                        src={
                                            foto.preview
                                                ? foto.preview
                                                : `data:image/jpeg;base64,${foto.imagen}`
                                        }
                                        alt={`Foto ${index + 1}`}
                                    />


                                    <button
                                        type="button"
                                        onClick={() =>
                                            eliminarFotografia(index)
                                        }
                                    >

                                        Eliminar

                                    </button>


                                </div>

                            ))

                        }

                    </div>

                )
            }


        </section>

    );

}


export default FormFotografias;