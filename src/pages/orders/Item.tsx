import axios from 'axios'
import css from './css.module.scss'
import { MDBTableBody } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { delateitem } from '../../features/cards/orderdetales';
import { FiDelete } from "react-icons/fi";
import { order } from '../../@types/Mytypes';
import Swal from 'sweetalert2';
const Items = (props: { arr: order[] }) => {
    let Dispatch = useAppDispatch()
    const { accessToken } = useAppSelector((s) => s.user);
    const navigate = useNavigate();
    return (
        <MDBTableBody>
            {props.arr.map((number, i: number) =>
                <tr className={number.status === true ? css.tr : ''} key={i}>
                    <th onClick={() => {
                        navigate(`/orders/detales/${number._id}`)
                    }} scope='row'>{i + 1}</th>
                    <td> {number._id}</td>
                    <td> {number.fullname}</td>
                    <td> {number.Email}</td>
                    <td><FiDelete onClick={() => {
                        Swal.fire({
                            title: 'האם אתה רוצה למחוק את ההזמנה?',
                            showCancelButton: true,
                            confirmButtonText: 'Save',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                axios.delete(`http://localhost:3001/carts/delate/${accessToken}/${number._id}`, {
                                }).then((response) => {
                                    console.log(response);

                                    if (response.data.Message === "susces") {
                                        Dispatch(delateitem(number._id))

                                        Swal.fire({
                                            icon: 'success',
                                            title: 'ההזמנה נמחקה בהצלחה',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                    }

                                }).catch((err) => {
                                    console.log(err);
                                    console.log(err.response.data.error);
                                })
                            } else if (result.isDenied) {
                                Swal.fire('ההזמנה לא נמחקה בהצלחה', '', 'info')
                            }
                        })
                    }} className={css.icon} size={28} /></td>
                </tr>
            )}
        </MDBTableBody>
    )
}

export default Items