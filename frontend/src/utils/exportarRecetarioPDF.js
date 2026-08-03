import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportarRecetarioPDF(nombreRecetario) {

    const pdf = new jsPDF({

        orientation: "landscape",
        unit: "mm",
        format: "a4"

    });

    const contenedor =
        document.getElementById(
            "contenedor-exportacion"
        );

    if (!contenedor) {

        throw new Error(
            "No existe el contenedor de exportación."
        );

    }

    const paginas = contenedor.querySelectorAll(

        ".ficha-pagina, .ficha-pagina2"

    );

    if (paginas.length === 0) {

        throw new Error(
            "No existen fichas para exportar."
        );

    }

    let primeraPagina = true;

    await new Promise((resolve) =>
        setTimeout(resolve, 300)
    );

    for (const pagina of paginas) {

        const canvas = await html2canvas(

            pagina,

            {

                scale: 2,

                useCORS: true,

                backgroundColor: "#ffffff"

            }

        );

        const imgData =
            canvas.toDataURL("image/png");

        // Tamaño de la hoja A4 horizontal
        const pageWidth = 297;
        const pageHeight = 210;

        // Margen alrededor de la hoja
        const margen = 10;

        // Área útil
        const maxWidth = pageWidth - (margen * 2);
        const maxHeight = pageHeight - (margen * 2);

        // Escalar respetando la proporción
        let imgWidth = maxWidth;
        let imgHeight =
            canvas.height *
            imgWidth /
            canvas.width;

        // Si la imagen sigue siendo muy alta,
        // volver a escalar usando la altura máxima.
        if (imgHeight > maxHeight) {

            imgHeight = maxHeight;

            imgWidth =
                canvas.width *
                imgHeight /
                canvas.height;

        }

        // Centrar dentro del área útil
        const x =
            (pageWidth - imgWidth) / 2;

        const y =
            (pageHeight - imgHeight) / 2;

        if (!primeraPagina) {

            pdf.addPage();

        }

        pdf.addImage(

            imgData,

            "PNG",

            x,

            y,

            imgWidth,

            imgHeight

        );

        primeraPagina = false;

    }

    pdf.save(`${nombreRecetario}.pdf`);

}