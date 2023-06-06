import Swal from 'sweetalert2'
const Swall = (props: { titel: string, timer: number }) => {
    return (
        Swal.fire({
            icon: 'success',
            title: props.titel,
            showConfirmButton: false,
            timer: props.timer
        }))
}

export default Swall