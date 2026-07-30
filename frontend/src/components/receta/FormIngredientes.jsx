import { useState } from "react";


function FormIngredientes({
    ingredientes,
    setIngredientes
}) {


    const [nuevoIngrediente, setNuevoIngrediente] = useState({

        nombre: "",

        cantidad: "",

        unidad: "",

        costo_unitario: "",

        rendimiento: "",

        importe: ""

    });





    const cambiarCampo = (e) => {


        const { name, value } = e.target;


        setNuevoIngrediente({

            ...nuevoIngrediente,

            [name]: value

        });


    };






    const agregarIngrediente = () => {


        if (!nuevoIngrediente.nombre.trim()) {

            return;

        }



        setIngredientes([

            ...ingredientes,

            nuevoIngrediente

        ]);



        setNuevoIngrediente({

            nombre: "",

            cantidad: "",

            unidad: "",

            costo_unitario: "",

            rendimiento: "",

            importe: ""

        });


    };






    const eliminarIngrediente = (index) => {


        const nuevos = ingredientes.filter(

            (_, i) => i !== index

        );


        setIngredientes(nuevos);


    };






    return (

        <section className="form-seccion">


            <h2>

                Ingredientes

            </h2>





            <div className="ingrediente-form">


                <input

                    type="text"

                    name="nombre"

                    placeholder="Ingrediente"

                    value={
                        nuevoIngrediente.nombre
                    }

                    onChange={cambiarCampo}

                />



                <input

                    type="text"

                    name="cantidad"

                    placeholder="Cantidad"

                    value={
                        nuevoIngrediente.cantidad
                    }

                    onChange={cambiarCampo}

                />



                <input

                    type="text"

                    name="unidad"

                    placeholder="Unidad"

                    value={
                        nuevoIngrediente.unidad
                    }

                    onChange={cambiarCampo}

                />



                <input

                    type="number"

                    name="costo_unitario"

                    placeholder="Costo"

                    value={
                        nuevoIngrediente.costo_unitario
                    }

                    onChange={cambiarCampo}

                />



                <input

                    type="text"

                    name="rendimiento"

                    placeholder="Rendimiento %"

                    value={
                        nuevoIngrediente.rendimiento
                    }

                    onChange={cambiarCampo}

                />



                <input

                    type="number"

                    name="importe"

                    placeholder="Importe"

                    value={
                        nuevoIngrediente.importe
                    }

                    onChange={cambiarCampo}

                />





                <button

                    type="button"

                    onClick={agregarIngrediente}

                >

                    + Agregar

                </button>



            </div>








            <div className="lista-ingredientes">


                {

                    ingredientes.map((ingrediente, index) => (


                        <div

                            key={index}

                            className="ingrediente-item"

                        >


                            <span>

                                {ingrediente.nombre}

                                {" - "}

                                {ingrediente.cantidad}

                                {" "}

                                {ingrediente.unidad}

                            </span>




                            <button

                                type="button"

                                onClick={() =>
                                    eliminarIngrediente(index)
                                }

                            >

                                Eliminar

                            </button>



                        </div>


                    ))

                }



            </div>



        </section>

    );

}


export default FormIngredientes;