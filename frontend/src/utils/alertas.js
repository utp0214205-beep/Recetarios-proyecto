import Swal from "sweetalert2";

export const alertaError = (
    mensaje,
    titulo = "Error"
) => {

    return Swal.fire({

        icon: "error",

        title: titulo,

        text: mensaje,

        confirmButtonColor: "#c62828"

    });

};

export const alertaExito = (
    mensaje,
    titulo = "Éxito"
) => {

    return Swal.fire({

        icon: "success",

        title: titulo,

        text: mensaje,

        confirmButtonColor: "#2e7d32"

    });

};

export const alertaAdvertencia = (
    mensaje,
    titulo = "Atención"
) => {

    return Swal.fire({

        icon: "warning",

        title: titulo,

        text: mensaje,

        confirmButtonColor: "#f9a825"

    });

};

export const confirmarEliminar = (
    mensaje = "Esta acción no se puede deshacer.",
    titulo = "¿Eliminar?"
) => {

    return Swal.fire({

        title: titulo,

        text: mensaje,

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Sí, eliminar",

        cancelButtonText: "Cancelar",

        confirmButtonColor: "#d32f2f",

        cancelButtonColor: "#757575"

    });

};