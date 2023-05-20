import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { AiFillBackward, AiFillForward } from "react-icons/ai";
import css from './css.module.scss'
import './mycss.css'
import img from './Jeffries & Madison.png'
const MYCarousel = () => {
    return (
        <Carousel interval={null} indicators={false} controls={false} nextIcon={<AiFillForward size={50} />} prevIcon={<AiFillBackward size={50} />} dir='ltr' className={`w-100 d-flex ${css.corsla}`}  >
            {/* <Carousel.co className='border-1 bg-danger' /> */}
            <Carousel.Item>
                <img
                    className={css.Imgcorsla}
                    src={img}
                    alt="First slide"
                />
                <Carousel.Caption className={css.Caption}>
                    <h3 className={css.h3}>גלה את הסטייל שלך</h3>
                    <p className={css.p}>חנות הבגדים המובילה עם המבחר הכי גדול של מוצרי אופנה</p>
                    <button className={css.btncorsla}>לקניה</button>
                </Carousel.Caption>
            </Carousel.Item>

        </Carousel>
    )
}

export default MYCarousel