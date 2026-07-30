function FormTecnicaCulinaria({
    tecnica,
    onChange
}) {

    return (

        <section className="form-seccion">

            <h2>Técnica culinaria</h2>

            <label>
                Tipo de corte
            </label>

            <input
                type="text"
                name="tipo_corte"
                value={tecnica.tipo_corte}
                onChange={onChange}
            />

            <label>
                Método de cocción
            </label>

            <input
                type="text"
                name="metodo_coccion"
                value={tecnica.metodo_coccion}
                onChange={onChange}
            />

            <label>
                Técnica de elaboración
            </label>

            <textarea
                name="tecnica_elaboracion"
                value={tecnica.tecnica_elaboracion}
                onChange={onChange}
                rows={5}
            />

        </section>

    );

}

export default FormTecnicaCulinaria;