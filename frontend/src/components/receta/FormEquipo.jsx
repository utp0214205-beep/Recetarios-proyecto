function FormEquipo({
    equipo,
    onChange
}) {

    return (

        <section className="form-seccion">

            <h2>Equipo y utensilios</h2>

            <label>
                Utensilios
            </label>

            <textarea
                name="utensilios"
                value={equipo.utensilios}
                onChange={onChange}
                rows={4}
            />

            <label>
                Temperatura de cocción
            </label>

            <input
                type="text"
                name="temperatura_coccion"
                value={equipo.temperatura_coccion}
                onChange={onChange}
            />

            <label>
                Temperatura de servicio
            </label>

            <input
                type="text"
                name="temperatura_servicio"
                value={equipo.temperatura_servicio}
                onChange={onChange}
            />

            <label>
                Material extra
            </label>

            <textarea
                name="material_extra"
                value={equipo.material_extra}
                onChange={onChange}
                rows={3}
            />

            <label>
                Unidades de medición
            </label>

            <textarea
                name="unidades_medicion"
                value={equipo.unidades_medicion}
                onChange={onChange}
                rows={3}
            />

        </section>

    );

}

export default FormEquipo;