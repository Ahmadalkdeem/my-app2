import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import css from './card.module.scss'
import { BsFillCartCheckFill } from "react-icons/bs";
import { Cardtype } from '../../@types/Mytypes';
import { Link } from 'react-router-dom';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsXCircleFill } from "react-icons/bs";
import { useAppDispatch } from '../../app/hooks';
import { addCard, deleteCard, editCard } from '../../features/cards/mycart';

function MyCard(props: any) {
    let Dispatch = useAppDispatch()

    return (
        <Card className={css.Card}>
            <Card.Img className={`${css.Img}`} variant="top" src={props.src[0]} alt={props.name} />
            <Card.Body className='pt-0'>
                <Card.Title className={css.titel}>{props.name}</Card.Title>
                <Card.Text>
                    <span className={css.P}>{props.hselect}</span>
                    <span className={css.P}>{props.color}</span>
                    <span className={css.P}>{props.sizeselect}</span>
                </Card.Text>
                <div className={css.Endcard}>
                    <BsXCircleFill onClick={() => {
                        Dispatch(deleteCard(props._id))
                    }} className={css.Icon} size={30} />
                    <Button className={`${css.Btn} bg-dark border-0 `}>{props.price}$</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default MyCard