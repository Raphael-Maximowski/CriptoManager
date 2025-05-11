
export const errorNotification = (errorText) => {
    Toastify({
        text: errorText,
        duration: 4000,
        gravity: "top",
        position: "right",
        style: {
            background: "#DC3544",
            borderBottom: "3px solid white",
            fontSize: '14px',
            minWidth: '250px'
        },
    }).showToast();
}

export const successNotification = (successText) => {
    Toastify({
        text: successText,
        duration: 4000,
        gravity: "top",
        position: "right",
        style: {
            background: "#28A744",
            borderBottom: "3px solid white",
            fontSize: '14px',
            minWidth: '250px'
        },
    }).showToast();
}