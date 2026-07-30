function FormProcedimiento({
    procedimiento,
    onChange
}) {

    return (

        <section className="form-seccion">

            <h2>Procedimiento</h2>

            <label>
                Mise en place
            </label>

            <textarea
                name="mise_en_place"
                value={procedimiento.mise_en_place}
                onChange={onChange}
                rows={4}
            />

            <label>
                Instrucciones
            </label>

            <textarea
                name="instrucciones"
                value={procedimiento.instrucciones}
                onChange={onChange}
                rows={8}
            />

        </section>

    );

}

export default FormProcedimiento;