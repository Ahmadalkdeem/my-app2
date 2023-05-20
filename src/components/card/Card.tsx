import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import css from './card.module.scss'
import Swal from "sweetalert2";
import { Cardtype } from '../../@types/Mytypes';
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import Carousel from 'react-bootstrap/Carousel';
import { Fade } from "react-awesome-reveal";
import { delteItem } from '../../features/cards/cardshirts';
import { delteItem2 } from '../../features/cards/cardPants';
import { delteItem3 } from '../../features/cards/cardshose';
import { useAppDispatch } from '../../app/hooks';
import axios from 'axios';
import { useAppSelector } from '../../app/hooks';

function MyCard(props: Cardtype) {
    let { id, email, roles, username, accessToken } = useAppSelector(e => e.user)

    const Dispatch = useAppDispatch()
    const getData = async () => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/uplode/delete/${props.category}/${props._id}/${accessToken}`, {
                }).then((response) => {
                    if (response.data.Message === 'susces') {
                        if (props.category === 'Shirts') Dispatch(delteItem(props._id))
                        if (props.category === 'pants') Dispatch(delteItem2(props._id))
                        if (props.category === 'shoes') Dispatch(delteItem3(props._id))
                        Swal.fire({
                            icon: 'success',
                            title: 'המוצר נמחק בהצלחה',
                            showConfirmButton: false,
                            timer: 1500
                        })

                    }

                }).catch((err: any) => {
                    console.log(err);
                    console.log(err.response.data.error);
                })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    };

    const navigate = useNavigate();
    let discount = Math.floor(((props.price2 - props.price) / props.price2) * 100)
    return (
        // <Fade triggerOnce className={`${css.Card}`}>

        <Card className={`${css.Card}`}>
            {roles[0] === 'admin' && <div className={`d-flex justify-content-between ${css.divicon}`}>
                <AiFillDelete onClick={getData} className={css.Icons} size={40} />
                <AiFillEdit onClick={() => { navigate(`/Editeproduct/${props.category}/${props._id}`) }} className={css.Icons} size={40} />

            </div>}



            <Carousel indicators={false} dir="ltr" className={`${css.corsla}`}>

                {props?.src.map((e: any, i: number) =>
                    <Carousel.Item key={i} interval={100000000000000} >
                        <img
                            onClick={() => {
                                navigate(`/${props.category}/${props.category2}/${props._id}`);
                            }}
                            className={css.Img}
                            src={`${e}`}
                            alt="First slide"
                        />
                    </Carousel.Item>
                )}
            </Carousel>


            <Card.Body onClick={() => {
                navigate(`/${props.category}/${props.category2}/${props._id}`);
            }} className={css.bodycard}>
                <Card.Title className={css.titel}>{props.name}</Card.Title>
                <Card.Title className={css.brand}>{props.brand}</Card.Title>
                <Card.Text className={css.P}>
                    <span className='d-flex justify-content-center align-items-center flex-wrap g-2'>

                        <span className={css.span}>{props.price2}₪</span>
                        <span >{props.price}₪</span>
                    </span>
                    <span className={css.discount}>{discount}% אחוז הנחה </span>
                </Card.Text>
            </Card.Body>
        </Card>

        //     </Fade> 
    )
}

export default MyCard