const PDFDocument = require("pdfkit");

const RecetaModel = require("../models/receta.model");


const generarPDFRecetario = async (
    recetario,
    res
) => {

    const doc = new PDFDocument({
        margin: 50
    });


    res.setHeader(
        "Content-Type",
        "application/pdf"
    );


    res.setHeader(
        "Content-Disposition",
        `attachment; filename="${recetario.nombre}.pdf"`
    );


    doc.pipe(res);



    // =====================================
    // PORTADA
    // =====================================

    doc
        .fontSize(22)
        .text(
            "Recetario Digital",
            {
                align: "center"
            }
        );


    doc.moveDown();


    doc
        .fontSize(18)
        .text(
            recetario.nombre,
            {
                align: "center"
            }
        );


    doc.moveDown(2);


    doc
        .fontSize(12)
        .text(
            `Alumno: ${recetario.alumno_nombre || ""} ${
                recetario.apellido_paterno || ""
            }`
        );


    doc.text(
        `Fecha de creación: ${
            recetario.fecha_creacion
            ? new Date(recetario.fecha_creacion)
                .toLocaleDateString("es-MX")
            : ""
        }`
    );


    doc.addPage();



    // =====================================
    // RECETAS
    // =====================================

    for (
        const recetaResumen of recetario.recetas
    ) {


        const receta =
            await RecetaModel.obtenerDetalleCompleto(
                recetaResumen.id_receta
            );


        doc
            .fontSize(18)
            .text(
                receta.nombre_platillo
            );


        doc.moveDown();


        // DATOS GENERALES

        doc
            .fontSize(14)
            .text(
                "Datos generales"
            );


        doc
            .fontSize(11)
            .text(
                `Asignatura: ${
                    receta.asignatura || ""
                }`
            );


        doc.text(
            `Clasificación: ${
                receta.clasificacion || ""
            }`
        );


        doc.text(
            `Fecha: ${
                receta.fecha
                ? new Date(receta.fecha)
                    .toLocaleDateString("es-MX")
                : ""
            }`
        );


        doc.moveDown();



        // INGREDIENTES

        doc
            .fontSize(14)
            .text(
                "Ingredientes"
            );


        doc.moveDown();


        receta.ingredientes.forEach(
            (ingrediente) => {

                doc
                    .fontSize(11)
                    .text(
                        `• ${
                            ingrediente.nombre
                        } - ${
                            ingrediente.cantidad
                        } ${
                            ingrediente.unidad
                        }`
                    );

            }
        );


        doc.moveDown();



        // PROCEDIMIENTO

        doc
            .fontSize(14)
            .text(
                "Procedimiento"
            );


        doc
            .fontSize(11)
            .text(
                receta.procedimiento
                    ?.instrucciones || ""
            );


        // Separación entre recetas

        doc.addPage();

    }


    doc.end();

};


module.exports = {
    generarPDFRecetario
};