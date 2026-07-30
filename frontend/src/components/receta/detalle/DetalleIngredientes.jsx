function DetalleIngredientes({ ingredientes }) {

    return (

        <section>

            <h2>

                Ingredientes

            </h2>

            <table>

                <thead>

                    <tr>

                        <th>Ingrediente</th>

                        <th>Cantidad</th>

                        <th>Unidad</th>

                        <th>Costo</th>

                        <th>Rend.</th>

                        <th>Importe</th>

                    </tr>

                </thead>

                <tbody>

                    {ingredientes.map((item) => (

                        <tr key={item.id_ingrediente_receta}>

                            <td>{item.nombre}</td>

                            <td>{item.cantidad}</td>

                            <td>{item.unidad}</td>

                            <td>{item.costo_unitario}</td>

                            <td>{item.rendimiento}</td>

                            <td>{item.importe}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </section>

    );

}

export default DetalleIngredientes;