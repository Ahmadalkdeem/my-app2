import React, { useState, useEffect } from 'react'
import css from './page.module.scss'
import Carousel from 'react-bootstrap/Carousel';
import FsLightbox from "fslightbox-react";
import Acording from '../../components/acording/Acording';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addCard } from '../../features/cards/mycart';
import MyCard from '../../components/card/Card';
import './style.css'
import Swal from 'sweetalert2';
import { Container, Row, Col } from 'react-bootstrap';
import Spiner from '../../components/Spiner/Spiner';
import { Helmet } from "react-helmet";

let fitem = {
    category: "Shirts",
    category2: "gfd",
    description: " ljbkbhi iib bkb ",
    id: "123",
    name: "asdv",
    price: "23",
    price2: "456",
    src: ['http://localhost:3001/7deb82fb-8931-4f48-bcff-98a21c8c87951679166329177-car.png'],
    stock: [{ size: 'S', colors: [{ color: 'blue' }] }],
    _id: '64160b7969fc817052a517d0'
}
function Page() {
    let { id, scategory, fcategory } = useParams()
    const [Theitem, setTheitem] = useState<any>(fitem)
    const [arr, setarr] = useState<any>([])
    const Navigate = useNavigate()
    let onDispatch = useAppDispatch()

    const { users3 } = useAppSelector((s) => s.cardshose);
    const { users2 } = useAppSelector((s) => s.cardPants);
    const { users } = useAppSelector((s) => s.cardshirts);
    const { cart } = useAppSelector((s) => s.mycart);


    const getData = async (e: { category: string, id: string }) => {
        await axios.get(`http://localhost:3001/uplode/findOne/${e.category}/${e.id}`).then((e) => {
            console.log(e);

            setTheitem(e.data)
            setState(e.data.stock[0].size)
            setcolor(e.data.stock[0].colors[0].color)
        }).catch((e) => {
            console.log(e);
            Navigate('/')
        });


    };
    const item = () => {
        if (fcategory !== 'shoes' && fcategory !== 'Shirts' && fcategory !== 'pants') { Navigate('/') }
        if (fcategory === 'shoes') {
            let x = users3.find((e: any) => e._id === id)
            if (x === undefined) {
                console.log('aa');

                getData({ category: 'shoes', id: `${id}` })
            } else {
                console.log('bb');
                setTheitem(x)
                setState(x.stock[0].size)
                setcolor(x.stock[0].colors[0].color)
            }
        }
        if (fcategory === 'Shirts') {
            let x = users.find((e: any) => e._id === id)

            if (x === undefined) {
                console.log('aa');

                getData({ category: 'Shirts', id: `${id}` })
            } else {
                console.log('bb');

                setTheitem(x)
                setState(x.stock[0].size)
                setcolor(x.stock[0].colors[0].color)
            }
        }
        if (fcategory === 'pants') {
            let x = users2.find((e: any) => e._id === id)

            if (x === undefined) {
                console.log('aa');

                getData({ category: 'pants', id: `${id}` })
            } else {
                console.log('bb');

                setTheitem(x)
                setState(x.stock[0].size)
                setcolor(x.stock[0].colors[0].color)
            }
        }
    }


    let x: any = Theitem.stock
    const [state, setState] = useState(Theitem.stock[0].size)
    const [color, setcolor] = useState(`${Theitem.stock[0].colors[0].color}`)
    let zz = Theitem.stock.find((xx: any) => xx.size === state)

    const [state2, setState2] = useState(1)

    let order = { sizeselect: state, color: color, quantity: state2 }

    const [toggler, setToggler] = useState(false);
    const [show, setshow] = useState('');
    useEffect(() => {
        item()
        setState2(1)
        window.scrollTo(0, 0)
        setarr([...users, ...users2, ...users3].sort(() => Math.random() - 0.5).slice(-8))

    }, [id, scategory, fcategory]);
    useEffect(() => {
        if (arr[0] === undefined || arr.length < 8) {
            setarr([...users, ...users2, ...users3].sort(() => Math.random() - 0.5).slice(-8))
        }
    }, [users, users2, users3]);
    return (
        <>
            <Helmet>
                <title>Your new meta title</title>
                <meta name="description" content="Web site created using create-react-app" />
                <meta name="keywords" content="HTML, CSS, JavaScript"></meta>
            </Helmet>
            {Theitem === fitem ? <Spiner /> : <>
                <div className={css.div}>
                    <FsLightbox
                        toggler={toggler}
                        sources={Theitem.src}
                        source={show}
                        type="image"


                    />
                    <Carousel dir="ltr" className={`${css.corsla}`}>
                        {Theitem?.src.map((e: any, i: number) =>
                            <Carousel.Item key={i} interval={100000000000000} >
                                <img
                                    onClick={() => {
                                        setToggler(!toggler)
                                        setshow(e)
                                    }}
                                    className={css.Img}
                                    src={e}
                                    alt={Theitem?.name}
                                />
                            </Carousel.Item>
                        )}

                    </Carousel>
                    <div className='p-3'>
                        <h3 className={`${css.h3} text-center mt-2`}>{Theitem?.name}</h3>
                        <h5 className={`text-center d-flex justify-content-center align-items-center ${css.price}`}>{Theitem?.price}₪ <span className={css.delateprice}>{Theitem?.price2}₪</span></h5>
                        <h5 className={css.h5}>מידות:</h5>
                        <div className='d-flex justify-content-center align-content-center flex-column '>
                            <div className={css.divsizes}>

                                {x.map((number: any, i: number) =>
                                    <div key={i} onClick={() => {
                                        if (state === number.size) {
                                        } else {
                                            setState(number.size)
                                            let zz2 = x.find((xx: any) => xx.size === number.size)
                                            let zz3 = x.findIndex((xx: any) => xx.size === number.size)
                                            let rtr = zz2?.colors.find((e: any) => e.color === color)
                                            if (rtr === undefined) {
                                                setcolor(x[zz3].colors[0].color)
                                            } else {
                                            }
                                        }
                                    }} className={number.size === `${state}` ? `${css.Btn1} ${css.Btn11}` : `${css.Btn1}`}>{number.size}</div>
                                )}
                            </div>

                            <h5 className={css.h5}>צבעים:</h5>
                            <div className={css.divsizes}>
                                {zz === undefined ? '' : zz.colors.map((number: any, i: number) =>
                                    <button key={i} onClick={() => { if (color === number.color) { } else { setcolor(number.color) } }} className={color === number.color ? `${css.Btn22} ${css.Btn11}` : `${css.Btn22}`}> <span style={{ background: number.color }} className={css.span}></span></button>
                                )}
                            </div>

                            <h5 className={css.h5}>כמות:</h5>
                            <div className='d-flex justify-content-center align-content-center'>
                                <div className={css.sizes}>
                                    <button onClick={() => {
                                        if (state2 === 10) {
                                        } else {
                                            setState2(state2 + 1)
                                        }
                                    }} className={css.Btn2}>+</button>
                                    <div className={css.amount}>{state2}</div>
                                    <button onClick={() => {
                                        if (state2 === 1) { } else {
                                            setState2(state2 - 1)
                                        }
                                    }} className={css.Btn2}>-</button>
                                </div>
                            </div>
                        </div>
                        <button className={css.Btn} onClick={() => {
                            onDispatch(addCard({ id: `${cart.length}`, ...Theitem, ...order }))
                            Swal.fire({
                                icon: 'success',
                                title: 'המוצר הוסף בהצלחה',
                                showConfirmButton: false,
                                timer: 800
                            })
                        }}>הוספה לסל קניות</button>
                        <Acording aa={`${Theitem?.description}`} />
                    </div>
                </div >
            </>}
            <Container className={`Container ${css.Container}`} fluid>
                <Row xs={2} sm={3} lg={4} xxl={5}>
                    {
                        arr.map((product: any, index: number) => (
                            <Col key={index} className="mt-2 p-1">
                                <MyCard key={index}
                                    {...product} />
                            </Col>
                        ))}
                </Row>
            </Container>
        </>
    )
}

export default Page



