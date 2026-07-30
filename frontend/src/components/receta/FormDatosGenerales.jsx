function FormDatosGenerales({
    datos,
    onChange
}) {

    return (

        <section className="form-seccion">

            <h2>Datos generales</h2>

            <label>
                Nombre del platillo
            </label>

            <input
                type="text"
                name="nombre_platillo"
                value={datos.nombre_platillo}
                onChange={onChange}
                required
            />

            <label>
                Asignatura
            </label>

            <input
                type="text"
                name="asignatura"
                value={datos.asignatura}
                onChange={onChange}
            />

            <label>
                Clasificación
            </label>

            <input
                type="text"
                name="clasificacion"
                value={datos.clasificacion}
                onChange={onChange}
            />

            <label>
                Fecha
            </label>

            <input
                type="date"
                name="fecha"
                value={datos.fecha}
                onChange={onChange}
            />

            <label>
                Número de práctica
            </label>

            <input
                type="number"
                name="numero_practica"
                value={datos.numero_practica}
                onChange={onChange}
            />

            <label>
                Tiempo de preparación
            </label>

            <input
                type="text"
                name="tiempo_preparacion"
                value={datos.tiempo_preparacion}
                onChange={onChange}
            />

            <label>
                Total de producción
            </label>

            <input
                type="text"
                name="total_produccion"
                value={datos.total_produccion}
                onChange={onChange}
            />

            <label>
                Número de porciones
            </label>

            <input
                type="number"
                name="numero_porciones"
                value={datos.numero_porciones}
                onChange={onChange}
            />

            <label>
                Cantidad por porción
            </label>

            <input
                type="text"
                name="cantidad_porcion"
                value={datos.cantidad_porcion}
                onChange={onChange}
            />

            <label>
                Aporte nutrimental
            </label>

            <textarea
                name="aporte_nutrimental"
                value={datos.aporte_nutrimental}
                onChange={onChange}
                rows={3}
            />

            <label>
                Método y tiempo de conservación
            </label>

            <textarea
                name="metodo_tiempo_conservacion"
                value={datos.metodo_tiempo_conservacion}
                onChange={onChange}
                rows={3}
            />

            <label>
                Maridaje
            </label>

            <textarea
                name="maridaje"
                value={datos.maridaje}
                onChange={onChange}
                rows={3}
            />

            <label>
                Costo total
            </label>

            <input
                type="number"
                step="0.01"
                name="costo_total"
                value={datos.costo_total}
                onChange={onChange}
            />

            <label>
                Costo por porción
            </label>

            <input
                type="number"
                step="0.01"
                name="costo_por_porcion"
                value={datos.costo_por_porcion}
                onChange={onChange}
            />

        </section>

    );

}

export default FormDatosGenerales;