import React, { useState, useEffect } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import { Helmet } from "react-helmet";
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { valMail, fullNameRegex, addressRegex, cityRegex, isZipRegex } from '../../validators/validators';
import css from './css.module.scss'
import Cartitem from './Cartitem';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { deleteArr } from '../../features/cards/mycart';
import { prouctorderdetales } from '../../@types/Mytypes';
import Swall from '../../components/swal/Swal';
import { Url } from '../../arrays/list';
const Mycart = () => {
    window.onscroll = () => { }
    let { cart } = useAppSelector((s) => s.mycart)
    let Dispatch = useAppDispatch()
    let pricecart = 0
    cart.map((e) => {
        pricecart = pricecart + e.price * e.quantity
    })
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [fullname, setfullname] = useState('')
    const [errfullname, seterrfullname] = useState('')
    const [Email, setEmail] = useState('')
    const [Erremail, setErremail] = useState('')
    const [Address, setAddress] = useState('')
    const [errAddress, seterrAddress] = useState('')
    const [Address2, setAddress2] = useState('')
    const [City, setCity] = useState('')
    const [errCity, seterrCity] = useState('')
    const [Zip, setZip] = useState('')
    const [errZip, seterrZip] = useState('')
    function val() {
        if (fullNameRegex.test(fullname) === true) seterrfullname(''); else seterrfullname('השם לא תקין');
        if (valMail.test(Email) === true) setErremail(''); else setErremail('מיל לא תקין');
        if (addressRegex.test(Address) === true) seterrAddress(''); else seterrAddress('הכתובת לא תקינה');
        if (cityRegex.test(City) === true) seterrCity(''); else seterrCity('שם העיר לא תקין');
        if (isZipRegex.test(Zip) === true) seterrZip(''); else seterrZip('המיקוד לא תקין');
        if (fullNameRegex.test(fullname) && valMail.test(Email) && addressRegex.test(Address) && cityRegex.test(City) && isZipRegex.test(Zip)) {
            if (cart[0] === undefined || null) { }
            else {
                let cart2: prouctorderdetales[] = []
                cart.map((e) => {
                    let item = { id: e._id, color: e.color, sizeselect: e.sizeselect, quantity: e.quantity }
                    cart2.push(item)
                })
                let Order = { fullname: fullname, Email: Email, Address: Address, Address2: Address2, City: City, Zip: Zip, pricecart: pricecart, cart: JSON.stringify(cart2) }


                axios.post(`${Url}carts/neworder`, {
                    ...Order
                }).then((response) => {
                    console.log(response);

                    setfullname('')
                    setEmail('')
                    setAddress('')
                    setAddress2('')
                    setCity('')
                    setZip('')
                    Dispatch(deleteArr())
                    Swall({ titel: 'ההזמנה בוצעה בהצלחה', timer: 1000 })
                }).catch((err: any) => {
                    console.log(err);

                })
            }
        }
    }


    return (
        <>
            <Helmet>
                <title>סל קניות חכם ופשוט לקניות מהירות | חנות האופנה המובילה באינטרנט</title>
                <meta name="description" content="קנו בקלות ובמהירות עם סל הקניות החכם שלנו. צרו את רשימת הקניות שלכם וקבלו משלוח חינם בקנייה מעל 200 ש ח. הזמינו עכשיו!" />
                <meta name="keywords" content=" סל קניות, קניות מהירות, משלוח חינם, אופנה, חנות, אינטרנט, קניות." />
            </Helmet>
            <h1 className={css.h1}>סל קניות</h1>
            <section className="h-100 w-100 gradient-custom">
                <MDBContainer className="py-1 h-100">
                    <MDBRow className="justify-content-center my-4">
                        <MDBCol md="8">
                            {cart.map((item, i: number) =>
                                <Cartitem key={i} {...item} />)
                            }
                            <MDBCard className="mb-2">
                                <MDBCardBody>
                                    <p>
                                        <strong>Expected shipping delivery</strong>
                                    </p>
                                    <p className="mb-0">12.10.2020 - 14.10.2020</p>
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard className="mb-4 mb-lg-0">
                                <MDBCardBody>
                                    <p>
                                        <strong>We accept</strong>
                                    </p>
                                    <MDBCardImage className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                        alt="Visa" />
                                    <MDBCardImage className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                        alt="American Express" />
                                    <MDBCardImage className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                        alt="Mastercard" />
                                    <MDBCardImage className="me-2" width="45px"
                                        src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                                        alt="PayPal acceptance mark" />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol md="4">
                            <Form>
                                <Row className="mb-1">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>fullname</Form.Label>
                                        <Form.Control value={fullname} onChange={(e: any) => { setfullname(e.target.value) }} className={css.Input} type="text" placeholder="fullname" />
                                        <p className={css.P}>{errfullname === '' ? '' : errfullname}</p>

                                    </Form.Group>
                                </Row>
                                <Row className="mb-1">
                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control value={Email} onChange={(e: any) => { setEmail(e.target.value) }} className={css.Input} type="email" placeholder="Enter email" />
                                        <p className={css.P}>{Erremail === '' ? '' : Erremail}</p>
                                    </Form.Group>
                                </Row>
                                <Form.Group className="mb-1" controlId="formGridAddress1">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control value={Address} onChange={(e: any) => { setAddress(e.target.value) }} className={css.Input} placeholder="1234 Main St" />
                                    <p className={css.P}>{errAddress === '' ? '' : errAddress}</p>
                                </Form.Group>
                                <Form.Group className="mb-1" controlId="formGridAddress2">
                                    <Form.Label>Address 2</Form.Label>
                                    <Form.Control value={Address2} onChange={(e: any) => { setAddress2(e.target.value) }} className={css.Input} placeholder="Apartment, studio, or floor" />
                                </Form.Group>
                                <Row className="mb-1">
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control value={City} className={css.Input} onChange={(e: any) => { setCity(e.target.value) }} />
                                        <p className={css.P}>{errCity === '' ? '' : errCity}</p>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Zip</Form.Label>
                                        <Form.Control value={Zip} onChange={(e: any) => { setZip(e.target.value) }} className={css.Input} />
                                        <p className={css.P}>{errZip === '' ? '' : errZip}</p>
                                    </Form.Group>
                                </Row>
                            </Form>
                            <MDBCard className="mb-4">
                                <MDBCardHeader>
                                    <MDBTypography tag="h5" className="mb-0">
                                        Summary
                                    </MDBTypography>
                                </MDBCardHeader>

                                <MDBCardBody>
                                    <MDBListGroup>
                                        <MDBListGroupItem
                                            className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                            Products
                                            <span>${(pricecart / 100 * 83).toFixed(2)}</span>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0">
                                            Shipping
                                            <span>Gratis</span>
                                        </MDBListGroupItem>
                                        <MDBListGroupItem
                                            className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div>
                                                <strong>Total amount</strong>
                                                <strong>
                                                    <p className="mb-0">(including VAT)</p>
                                                </strong>
                                            </div>
                                            <span>
                                                <strong>${pricecart}</strong>
                                            </span>
                                        </MDBListGroupItem>
                                    </MDBListGroup>
                                    <button onClick={val} className='btn btn-primary'>
                                        Go to checkout

                                    </button>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    )
}

export default Mycart




