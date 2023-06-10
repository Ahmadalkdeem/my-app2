import css from './css.module.scss'
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBRipple,
    MDBRow,
} from "mdb-react-ui-kit";
import { deleteCard, editCard } from '../../features/cards/mycart';

import { BsTrash3 } from "react-icons/bs";
import { useAppDispatch } from '../../app/hooks';
import { Cardforcart } from '../../@types/Mytypes';
const Cartitem = (props: Cardforcart) => {
    let Dispatch = useAppDispatch()

    return (
        <>
            <MDBCard className={`mb-2 ${css.card}`}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol lg="3" md="12" className="mb-1 mb-lg-0">
                            <MDBRipple rippleTag="div" rippleColor="light"
                                className="bg-image rounded hover-zoom hover-overlay">
                                <img
                                    alt={props.src[0]}
                                    src={props.src[0]}
                                    className={css.img} />
                                <a href="#!">
                                    <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)", }}>
                                    </div>
                                </a>
                            </MDBRipple>
                        </MDBCol>

                        <MDBCol lg="5" md="6" className=" mb-2 mb-lg-0">
                            <p>
                                <strong>{props.name}</strong>
                            </p>
                            <p>Color: {props.color}</p>
                            <p>Size: {props.sizeselect}</p>
                            <BsTrash3 onClick={() => {
                                Dispatch(deleteCard(props._id))
                            }} size={34} className={css.icon} />
                        </MDBCol>
                        <MDBCol lg="4" md="6" className="mb-lg-0">
                            <div className="d-flex justify-content-center mb-2" style={{ maxWidth: "300px" }}>
                                <div className={css.sizes}>
                                    <button onClick={() => {
                                        if (props.quantity === 10) {
                                        } else {
                                            console.log(props);

                                            Dispatch(editCard({ ...props, quantity2: 1 }))
                                        }
                                    }} className={css.Btn2}>+</button>
                                    <div className={css.amount}>{props.quantity}</div>
                                    <button onClick={() => {
                                        if (props.quantity === 1) { } else {
                                            Dispatch(editCard({ ...props, quantity2: -1 }))
                                        }
                                    }} className={css.Btn2}>-</button>
                                </div>
                            </div>

                            <p className="text-start text-md-center">
                                <strong>${props.price * props.quantity}</strong>
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>

            </MDBCard></>)
}

export default Cartitem