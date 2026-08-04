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
                (_, i)=> i !== index
            )

        );


    };


    console.log("FOTOS DEL FORM");
    console.log(listaFotografias);
    return (

        <section className="form-seccion ficha-edicion">


            <table className="tabla-fotografia-edicion">


                <tbody>


                    <tr>


                        <th>
                            Fotografía de la receta
                        </th>



                        <td>


                            <div className="contenedor-foto-edicion">


                                <label className="btn-cambiar-foto">


                                    Cambiar fotografía


                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={seleccionarImagen}
                                    />


                                </label>



                                {
                                    listaFotografias.length > 0 && (

                                        listaFotografias.map(
                                            (foto,index)=>(

                                                <div
                                                    className="foto-edicion"
                                                    key={index}
                                                >


                                                    console.log("FOTO COMPLETA", foto);
                                                    console.log("PREVIEW", foto.preview);
                                                    console.log("IMAGEN", foto.imagen);

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

                                                        onClick={()=>
                                                            eliminarFotografia(index)
                                                        }

                                                    >

                                                        Eliminar

                                                    </button>



                                                </div>

                                            )

                                        )

                                    )
                                }


                            </div>


                        </td>


                    </tr>


                </tbody>


            </table>


        </section>


    );

}


export default FormFotografias;