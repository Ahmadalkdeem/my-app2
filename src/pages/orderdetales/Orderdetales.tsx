import { useState, useEffect } from 'react'
import { useAppSelector } from '../../app/hooks'
import { useParams } from 'react-router-dom'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import css from './css.module.scss'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Spiner from '../../components/Spiner/Spiner'
import { useAppDispatch } from '../../app/hooks';
import { updateitem } from '../../features/cards/orderdetales';
import { useNavigate } from 'react-router-dom';
import { order } from '../../@types/Mytypes';
import Swall from '../../components/swal/Swal';
const Orderdetales = () => {
    let Navigate = useNavigate()
    let Dispatch = useAppDispatch()
    let { id2 } = useParams()
    const { arr, arr2 } = useAppSelector((s) => s.orders)
    const { accessToken } = useAppSelector((s) => s.user)
    const [users, setusers] = useState<order>()

    const [index, setindex] = useState<number>()

    function getorder() {

        axios.get(`http://localhost:3001/carts/getoneorder2/${accessToken}/${id2}`, {
        }).then((response) => {
            setusers(response.data[0])
            console.log(response);

        }).catch((err: any) => {
            console.log(err);
            console.log(err.response.data.error);
        })

    }
    useEffect(() => {
        window.scrollTo(0, 0)//...arr, 
        let item = [...arr2, ...arr].find((e) => e._id === id2)
        if (item === undefined) { getorder() }
        else {
            setindex(arr.findIndex((e) => e._id === id2) + 1)
            setusers(item)
        }
    }, [id2]);
    return (
        <>
            {users === undefined || null ? <Spiner /> :
                <>
                    <div className={css.Div}>
                        <input onClick={() => {
                            axios.put(`http://localhost:3001/carts/putoneorder/${accessToken}/${id2}`, {
                            }).then((response) => {
                                Dispatch(updateitem(id2))
                                Swall({ titel: 'ההזמנה בוצעה בהצלחה', timer: 1000 })
                                Navigate(-1)
                            }).catch((err: any) => {
                                console.log(err);
                                console.log(err.response.data.error);
                            })

                        }} className='btn btn-primary' type="button" value='ההזמנה בוצעה' />
                        <MDBTable className={css.table}>
                            <MDBTableHead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>orderId</th>
                                    <th scope='col'>username</th>
                                    <th scope='col'>email</th>
                                    <th scope='col'>City</th>
                                    <th scope='col'>Address</th>
                                    <th scope='col'>Address2</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <tr >
                                    <th scope='row'>{index}</th>
                                    <td> {users._id}</td>
                                    <td> {users.fullname}</td>
                                    <td> {users.Email}</td>
                                    <td> {users.City}</td>
                                    <td> {users.Address}</td>
                                    <td> {users.Address2}</td>
                                </tr>

                            </MDBTableBody>
                        </MDBTable>
                    </div>
                    <div className={css.Divcards}>
                        {users.arr.map((number: any, i: number) =>

                            <Card key={i} style={{ width: '18rem' }}>
                                <Card.Img className={css.Img} variant="top" src={users.products[0].find((e) => e._id === number.id)?.src[0]} />
                                <Card.Body>
                                    <div>
                                        <MDBTable className={css.table}>
                                            <MDBTableHead>
                                                <tr>
                                                    <th scope='col'>brand:</th>
                                                    <th scope='col'>category:</th>
                                                </tr>
                                            </MDBTableHead>
                                            <MDBTableBody>
                                                <tr >
                                                    <td> {users.products[0].find((e) => e._id === number.id)?.brand}</td>
                                                    <td> {users.products[0].find((e) => e._id === number.id)?.category}</td>
                                                </tr>

                                            </MDBTableBody>
                                        </MDBTable>
                                    </div>
                                    <div>
                                        <MDBTable className={css.table}>
                                            <MDBTableHead>
                                                <tr>
                                                    <th scope='col'>כמות:</th>
                                                    <th scope='col'>מידה:</th>
                                                    <th scope='col'>צבע:</th>
                                                </tr>
                                            </MDBTableHead>
                                            <MDBTableBody>
                                                <tr >
                                                    <td>{number.quantity}</td>
                                                    <td>{number.sizeselect}</td>
                                                    <td>{number.color}</td>
                                                </tr>

                                            </MDBTableBody>
                                        </MDBTable>
                                    </div>

                                </Card.Body>
                            </Card>
                        )}
                    </div>
                </>
            }

        </>
    )
}

export default Orderdetales