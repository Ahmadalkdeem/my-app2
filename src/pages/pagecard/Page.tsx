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
import './style.css'
import Swall from '../../components/swal/Swal';
import Spiner from '../../components/Spiner/Spiner';
import { Helmet } from "react-helmet";
import { Cardtype } from '../../@types/Mytypes';
import List from '../../components/List/List';
import { Url } from '../../arrays/list';

function Page() {
    window.onscroll = () => { }
    let { id, fcategory } = useParams()
    const [Theitem, setTheitem] = useState<Cardtype>()
    const [arr, setarr] = useState<Cardtype[]>([])
    const Navigate = useNavigate()
    let Dispatch = useAppDispatch()
    const users22 = useAppSelector((s) => s.cardPants.users);
    const users33 = useAppSelector((s) => s.cardshose.users);
    const users11 = useAppSelector((s) => s.cardshirts.users);
    const users2 = useAppSelector((s) => s.cardPants.findusers);
    const users3 = useAppSelector((s) => s.cardshose.findusers);
    const users1 = useAppSelector((s) => s.cardshirts.findusers);
    const users12 = useAppSelector((s) => s.arrays.arrproduct);
    const { update } = useAppSelector((s) => s.updates);
    const { cart } = useAppSelector((s) => s.mycart);

    const getData = async (e: { category: string, id: string }) => {
        await axios.get(`${Url}cards/findOne/${e.category}`, { params: { id: e.id } }).then((e) => {
            setTheitem(e.data)
            setState(e.data.stock[0].size)
            setcolor(e.data.stock[0].colors[0].color)
        }).catch((e) => {
            console.log(e);
            Navigate('/')
        });
    };
    const item = () => {
        let arr: Cardtype[] = [...users22, ...users11, ...users33, ...users1, ...users2, ...users3, ...users12]
        let item = arr.find((e) => e._id === id)
        let item2 = update.find((e) => e._id === id)

        if (item !== undefined) {
            setTheitem(item)
            setState(item.stock[0].size)
            setcolor(item.stock[0].colors[0].color)
        }
        if (item2 !== undefined) {
            setTheitem(item2)
            setState(item2.stock[0].size)
            setcolor(item2.stock[0].colors[0].color)
        } else {
            getData({ category: `${fcategory}`, id: `${id}` })
        }
    }
    const [state, setState] = useState()
    const [color, setcolor] = useState()
    const [state2, setState2] = useState(1)
    const [toggler, setToggler] = useState(false);
    const [show, setshow] = useState('');
    useEffect(() => {
        item()
        setState2(1)
        window.scrollTo(0, 0)
        let arr: Cardtype[] = [...users22, ...users11, ...users33]
        setarr(arr.sort(() => Math.random() - 0.5).slice(-8))

    }, [id, fcategory]);
    useEffect(() => {
        if (arr[0] === undefined || arr.length < 8) {
            let arr: Cardtype[] = [...users22, ...users11, ...users33, ...users1, ...users2, ...users3]
            setarr(arr.sort(() => Math.random() - 0.5).slice(-8))
            window.scrollTo(0, 0)
        }

    }, [users1, users2, users3, users11, users22, users33]);
    return (
        <>
            <Helmet>
                <title>Your new meta title</title>
                <meta name="description" content="Web site created using create-react-app" />
                <meta name="keywords" content="HTML, CSS, JavaScript"></meta>
            </Helmet>
            {Theitem === undefined ? <Spiner /> : <>
                <div className={css.div}>
                    <FsLightbox
                        toggler={toggler}
                        sources={Theitem.src}
                        source={show}
                        type="image"


                    />
                    <Carousel dir="ltr" className={`${css.corsla}`}>
                        {Theitem?.src.map((e: string, i: number) =>
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
                    <div className='p-3 w-100'>
                        <h3 className={`${css.h3} text-center mt-2`}>{Theitem?.name}</h3>
                        <h5 className={`text-center d-flex justify-content-center align-items-center ${css.price}`}>{Theitem?.price}₪ <span className={css.delateprice}>{Theitem?.price2}₪</span></h5>
                        <h5 className={css.h5}>מידות:</h5>
                        <div className='d-flex justify-content-center align-content-center flex-column '>
                            <div className={css.divsizes}>

                                {Theitem.stock.map((number: any, i: number) =>
                                    <div key={i} onClick={() => {
                                        if (state === number.size) {
                                        } else {
                                            setState(number.size)
                                            let item = Theitem.stock.find((xx: any) => xx.size === number.size)
                                            let index = Theitem.stock.findIndex((xx: any) => xx.size === number.size)
                                            let item2 = item?.colors.find((e: any) => e.color === color)
                                            if (item2 === undefined) {
                                                setcolor(Theitem.stock[index].colors[0].color)
                                            } else {
                                            }
                                        }
                                    }} className={number.size === `${state}` ? `${css.Btn1} ${css.Btn11}` : `${css.Btn1}`}>{number.size}</div>
                                )}
                            </div>

                            <h5 className={css.h5}>צבעים:</h5>
                            <div className={css.divsizes}>
                                {Theitem.stock.find((xx: any) => xx.size === state) === undefined ? '' : Theitem.stock.find((xx: any) => xx.size === state).colors.map((number: any, i: number) =>
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
                            Dispatch(addCard({ id: `${cart.length}`, ...Theitem, ...{ sizeselect: state, color: color, quantity: state2 } }))
                            Swall({ titel: 'המוצר הוסף בהצלחה', timer: 800 })
                        }}>הוספה לסל קניות</button>
                        <Acording aa={`${Theitem?.description}`} />
                    </div>
                </div >
            </>}
            <List arr={arr} />

        </>
    )
}

export default Page



