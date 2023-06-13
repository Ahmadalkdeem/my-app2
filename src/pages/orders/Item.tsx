import axios from 'axios'
import css from './css.module.scss'
import { MDBTableBody } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { delateitem } from '../../features/cards/orderdetales';
import { FiDelete } from "react-icons/fi";
import { order } from '../../@types/Mytypes';
import Swall from '../../components/swal/Swal';
import Swal from 'sweetalert2';
import { Url } from '../../arrays/list';
const Items = (props: { arr: order[] }) => {
    let Dispatch = useAppDispatch()
    const { accessToken } = useAppSelector((s) => s.user);
    const navigate = useNavigate();
    return (
        <MDBTableBody>
            {props.arr.map((Order, i: number) =>
                <tr className={Order.status === true ? css.tr : ''} key={i}>
                    <th onClick={() => {
                        navigate(`/orders/detales/${Order._id}`)
                    }} scope='row'>{i + 1}</th>
                    <td onClick={() => {
                        navigate(`/orders/detales/${Order._id}`)
                    }}> {Order._id}</td>
                    <td> {Order.fullname}</td>
                    <td> {Order.Email}</td>
                    <td><FiDelete onClick={() => {
                        Swal.fire({
                            title: 'האם אתה רוצה למחוק את ההזמנה?',
                            showCancelButton: true,
                            confirmButtonText: 'Save',
                        }).then((result) => {
                            if (result.isConfirmed) {
                                axios.delete(`${Url}carts/delate`, { params: { id: Order._id, accessToken: accessToken } }).then((response) => {

                                    if (response.data.Message === "susces") {
                                        Dispatch(delateitem(Order._id))
                                        Swall({ titel: 'ההזמנה נמחקה בהצלחה', timer: 1000 })
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