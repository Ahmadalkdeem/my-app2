import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import css from './card.module.scss'
import Swal from "sweetalert2";
import { Cardtype } from '../../@types/Mytypes';
import { useNavigate } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { Url } from '../../arrays/list';
import Carousel from 'react-bootstrap/Carousel';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import axios from 'axios';
import { addDelate } from '../../features/cards/updates';
import { addItem } from '../../features/cards/favorites';
function MyCard(props: Cardtype) {
    const [card, setcard] = useState<Cardtype>(props)
    let { roles, accessToken } = useAppSelector(e => e.user)
    let { delate, update } = useAppSelector(e => e.updates)
    let { arr } = useAppSelector(e => e.Favorites)
    let isFavorites = arr.findIndex(e => e._id === card._id)
    let find = delate.findIndex(e => e === card._id)

    useEffect(() => {
        let item: any = update.find(e => e._id === props._id)
        if (item !== undefined || null) { setcard(item) }
        else { setcard(props) }
    }, [props._id]);

    const Dispatch = useAppDispatch()
    const getData = async () => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${Url}uplode/delete/${card.category}`, { params: { id: props._id, accessToken: accessToken } }).then((response) => {
                    if (response.data.Message === 'susces') {
                        Dispatch(addDelate(props._id))
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
    let discount = Math.floor(((card.price2 - card.price) / card.price2) * 100)
    return (
        <>
            {find === -1 &&
                <Card className={`${css.Card}`}>
                    <div className={`d-flex justify-content-between ${css.divicon}`}>
                        <MdOutlineFavoriteBorder color={isFavorites !== -1 ? 'red' : ''} size={35} onClick={() => {
                            Dispatch(addItem({ card: card, accessToken: accessToken }))
                        }} />
                        {roles[0] === 'admin' && <>
                            <AiFillDelete onClick={getData} className={css.Icons} size={35} />
                            <AiFillEdit onClick={() => { navigate(`/Editeproduct/${card.category}/${card._id}`) }} className={css.Icons} size={35} />
                        </>}

                    </div>



                    <Carousel indicators={false} dir="ltr" className={`${css.corsla}`}>

                        {card?.src.map((e, i: number) =>
                            <Carousel.Item key={i} interval={100000000000000} >
                                <img
                                    onClick={() => {
                                        navigate(`/${card.category}/${card._id}`);
                                    }}
                                    className={css.Img}
                                    src={e}
                                    alt={card.name}
                                />
                            </Carousel.Item>
                        )}
                    </Carousel>


                    <Card.Body onClick={() => {
                        navigate(`/${card.category}/${card._id}`);
                    }} className={css.bodycard}>
                        <Card.Title className={css.titel}>{card.name}</Card.Title>
                        <Card.Title className={css.brand}>{card.brand}</Card.Title>
                        <Card.Text className={css.P}>
                            <span className='d-flex justify-content-center align-items-center flex-wrap g-2'>

                                <span className={css.span}>{card.price2}₪</span>
                                <span >{card.price}₪</span>
                            </span>
                            <span className={css.discount}>{discount}% אחוז הנחה </span>
                        </Card.Text>
                    </Card.Body>
                </Card>}
        </>
    )
}

export default MyCard