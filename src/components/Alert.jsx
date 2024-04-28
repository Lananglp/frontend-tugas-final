import Swal from "sweetalert2";

export const alert = (text) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
        customClass: {
            popup: 'alertContainer',
        }
    });
    return Toast.fire({
        icon: "success",
        title: `${text}`,
    });
};

export const confirmAlert = (title, text) => {
    return Swal.fire({
        title: `${title}`,
        text: `${text}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        customClass: {
            popup: 'confirmAlertContainer',
        }
    });
};