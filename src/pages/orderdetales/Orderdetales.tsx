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
import { Url } from '../../arrays/list';
const Orderdetales = () => {
    window.onscroll = () => { }
    let Navigate = useNavigate()
    let Dispatch = useAppDispatch()
    let { id } = useParams()

    const { arr, arr2 } = useAppSelector((s) => s.orders)
    const { accessToken } = useAppSelector((s) => s.user)
    const [orderDetales, setorderDetales] = useState<order>()
    const [index, setindex] = useState<number>()
    function getorder() {
        axios.get(`${Url}carts/getoneorderId`, {
            params: { accessToken: accessToken, id: id }
        }).then((response) => {
            setorderDetales(response.data[0])

        }).catch((err: any) => {
            console.log(err);
            console.log(err.response.data.error);
        })

    }
    useEffect(() => {
        window.scrollTo(0, 0)
        let item = [...arr2, ...arr].find((e) => e._id === id)
        if (item === undefined) { getorder() }
        else {
            setindex(arr.findIndex((e) => e._id === id) + 1)
            setorderDetales(item)
        }
    }, [id]);
    return (
        <>
            {orderDetales === undefined || null ? <Spiner /> :
                <>
                    <div className={css.Div}>
                        <input onClick={() => {
                            axios.put(`${Url}carts/putoneorder`, { params: { id: id, accessToken: accessToken } }).then((response) => {
                                Dispatch(updateitem(id))
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
                                    <td> {orderDetales._id}</td>
                                    <td> {orderDetales.fullname}</td>
                                    <td> {orderDetales.Email}</td>
                                    <td> {orderDetales.City}</td>
                                    <td> {orderDetales.Address}</td>
                                    <td> {orderDetales.Address2}</td>
                                </tr>

                            </MDBTableBody>
                        </MDBTable>
                    </div>
                    <div className={css.Divcards}>
                        {orderDetales.arr.map((orderdetales: any, i: number) =>

                            <Card key={i} style={{ width: '18rem' }}>
                                <Card.Img className={css.Img} variant="top" src={orderDetales.products[0].find((e) => e._id === orderdetales.id)?.src[0] !== undefined ? orderDetales.products[0].find((e) => e._id === orderdetales.id)?.src[0] : 'a'} />
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
                                                    <td> {orderDetales.products[0].find((e) => e._id === orderdetales.id)?.brand !== undefined ? orderDetales.products[0].find((e) => e._id === orderdetales.id)?.brand : ''}</td>
                                                    <td> {orderDetales.products[0].find((e) => e._id === orderdetales.id)?.category !== undefined ? orderDetales.products[0].find((e) => e._id === orderdetales.id)?.category : ''}</td>
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
                                                    <td>{orderdetales.quantity}</td>
                                                    <td>{orderdetales.sizeselect}</td>
                                                    <td>{orderdetales.color}</td>
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