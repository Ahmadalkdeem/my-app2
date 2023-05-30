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
const Orderdetales = () => {
    let Dispatch = useAppDispatch()
    let { id2 } = useParams()
    const { users4 } = useAppSelector((s) => s.orders)
    const { accessToken } = useAppSelector((s) => s.user)
    const [users, setusers] = useState<any>()
    console.log(users);

    const [index, setindex] = useState<number>()

    function getorder() {

        axios.get(`http://localhost:3001/carts/getoneorder/${accessToken}/${id2}`, {
        }).then((response) => {
            console.log(response);
            setusers(response.data[0])
        }).catch((err: any) => {
            console.log(err);
            console.log(err.response.data.error);
        })

    }
    useEffect(() => {
        window.scrollTo(0, 0)
        let order: any = users4.find((e: any) => e._id === id2)
        setindex(users4.findIndex((e: any) => e._id === id2) + 1)
        if (order === undefined) { getorder() }
        else { setusers(order) }
    }, [id2]);
    return (
        <>
            {users === undefined || null ? <Spiner /> :
                <>
                    <div className={css.Div}>
                        <input onClick={() => {
                            axios.put(`http://localhost:3001/carts/putoneorder/${accessToken}/${id2}`, {
                            }).then((response) => {
                                console.log(response);
                                Dispatch(updateitem(id2))
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
                        {users.products[0].map((number: any, i: number) =>

                            <Card key={i} style={{ width: '18rem' }}>
                                <Card.Img className={css.Img} variant="top" src={number.src[0]} />
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
                                                    <td> {number.name}</td>
                                                    <td> {number.category}</td>
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
                                                    <td> {users.arr.find((e: any) => e.id === number._id).quantity}</td>
                                                    <td> {users.arr.find((e: any) => e.id === number._id).sizeselect}</td>
                                                    <td> {users.arr.find((e: any) => e.id === number._id).color}</td>
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