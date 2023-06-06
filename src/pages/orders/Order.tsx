import { useEffect } from 'react'
import axios from 'axios'
import css from './css.module.scss'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Spiner from '../../components/Spiner/Spiner'
import { addItem, delateitem } from '../../features/cards/orderdetales';
import { FiDelete, FiChevronsDown } from "react-icons/fi";
import Swal from 'sweetalert2';
import FindOrder from '../../components/item/Order';
import Items from './Item';
const Order = () => {
    let Dispatch = useAppDispatch()
    const { arr, arr2 } = useAppSelector((s) => s.orders);
    const { accessToken } = useAppSelector((s) => s.user);
    const navigate = useNavigate();
    function getdata() {//{ params: data }
        axios.get(`http://localhost:3001/carts/getorders/${accessToken}/${arr.length}`, { params: { order: 'all' } }).then((response) => {
            console.log(response);

            Dispatch(addItem(response.data))
            if (response.data.length === 0) alert('אין יותר הזמנות')
        }).catch((err: any) => {
            console.log(err);
            console.log(err.response.data.error);
        })
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        if (arr.length === 0) { getdata() }
    }, []);

    return (
        <>

            {arr.length === 0 ? <Spiner /> :
                <div className={css.Div}>
                    <FindOrder />
                    <MDBTable className={css.table}>
                        <MDBTableHead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>orderId</th>
                                <th scope='col'>fullname</th>
                                <th scope='col'>email</th>
                                <th scope='col'>delate</th>
                                {/* <th scope='col'>update</th> */}
                            </tr>
                        </MDBTableHead>
                        {arr2.length === 0 ? '' : <>
                            <Items arr={arr2} /></>}
                        <Items arr={arr} />

                    </MDBTable>
                </div>
            }
            <input className='btn btn-primary m-1 pt-1' type="button" value="more orders" onClick={getdata} />
        </>
    )
}

export default Order