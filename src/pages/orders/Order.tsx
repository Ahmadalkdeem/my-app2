import { useEffect } from 'react'
import axios from 'axios'
import css from './css.module.scss'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Spiner from '../../components/Spiner/Spiner'
import { addItem2 } from '../../features/cards/orderdetales';
const Order = () => {
    let Dispatch = useAppDispatch()
    const { users4 } = useAppSelector((s) => s.orders);
    const { accessToken } = useAppSelector((s) => s.user);
    console.log(users4.length);

    const navigate = useNavigate();
    function getdata() {
        console.log(users4.length);
        axios.get(`http://localhost:3001/carts/getorders/${accessToken}/${users4.length}`, {
        }).then((response) => {
            console.log(response);

            Dispatch(addItem2(response.data))
        }).catch((err: any) => {
            console.log(err);
            console.log(err.response.data.error);
        })
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        if (users4.length < 1) { getdata() }
    }, []);

    return (
        <>
            {users4.length === 0 ? <Spiner /> :
                <div className={css.Div}>

                    <MDBTable className={css.table}>
                        <MDBTableHead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>orderId</th>
                                <th scope='col'>fullname</th>
                                <th scope='col'>email</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {users4.map((number: any, i: number) =>
                                <tr onClick={() => {
                                    navigate(`/orders/detales/${number._id}`)
                                }} key={i}>
                                    <th scope='row'>{i + 1}</th>
                                    <td> {number._id}</td>
                                    <td> {number.fullname}</td>
                                    <td> {number.Email}</td>
                                </tr>
                            )}
                        </MDBTableBody>
                    </MDBTable>
                </div>
            }
            <input className='btn btn-primary m-1 pt-1' type="button" value="more orders" onClick={getdata} />
        </>
    )
}

export default Order