function FormFotografias({
    fotografias,
    setFotografias
}) {

    const seleccionarImagenes = (e) => {

        const archivos = Array.from(e.target.files);

        const nuevas = archivos.map((archivo) => ({

            archivo,

            preview: URL.createObjectURL(archivo)

        }));

        setFotografias([
            ...fotografias,
            ...nuevas
        ]);

    };

    const eliminarFotografia = (index) => {

        const nuevas = fotografias.filter(
            (_, i) => i !== index
        );

        setFotografias(nuevas);

    };

    return (

        <section className="form-seccion">

            <h2>Fotografías</h2>

            <input
                type="file"
                multiple
                accept="image/*"
                onChange={seleccionarImagenes}
            />

            {

                fotografias.length > 0 && (

                    <div className="galeria-fotos">

                        {

                            fotografias.map((foto, index) => (

                                <div
                                    className="foto-item"
                                    key={index}
                                >

                                    <img
                                        src={foto.preview}
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