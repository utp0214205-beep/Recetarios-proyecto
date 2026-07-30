function FormInformacionComplementaria({
    informacion,
    onChange
}) {

    return (

        <section className="form-seccion">

            <h2>Información complementaria</h2>

            <label>
                Historia
            </label>

            <textarea
                name="historia"
                value={informacion.historia}
                onChange={onChange}
                rows={4}
            />

            <label>
                Conclusiones
            </label>

            <textarea
                name="conclusiones"
                value={informacion.conclusiones}
                onChange={onChange}
                rows={4}
            />

            <label>
                Buenas prácticas
            </label>

            <textarea
                name="buenas_practicas"
                value={informacion.buenas_practicas}
                onChange={onChange}
                rows={4}
            />

            <label>
                Referencias bibliográficas
            </label>

            <textarea
                name="referencias"
                value={informacion.referencias}
                onChange={onChange}
                rows={4}
            />

        </section>

    );

}

export default FormInformacionComplementaria;