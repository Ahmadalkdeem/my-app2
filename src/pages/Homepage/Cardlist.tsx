import React, { useEffect } from 'react'
import css from './css.module.scss'
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../../app/hooks'
import Myslider from '../../components/slider/Slider';
import MYCarousel from '../../components/corsla/Carousel';
import { Helmet } from "react-helmet";
import List from '../../components/List/List';
import { divcomponts } from '../../arrays/list';
import H2 from '../../components/h2/H2';
function Cardlist() {
    window.onscroll = () => { }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const { users } = useAppSelector((s) => s.cardshirts);
    let item = useAppSelector((e) => e.cardshose.users)
    const navigate = useNavigate();
    return (
        <>
            <Helmet>
                <title>ברוכים הבאים לאתר שלנו | חנות האופנה המובילה באינטרנט</title>
                <meta name="description" content="כאן תוכלו למצוא את המגוון הרחב שלנו של מכנסיים, נעליים, חולצות ועוד. הזמינו עכשיו ותהיו מרוצים!" />
                <meta name="keywords" content="אופנה, מכנסיים, נעליים, חולצות, חנות, אינטרנט, קניות" />
            </Helmet>

            <MYCarousel />
            <Myslider />
            <H2 h2='המוצרים החמים' />
            <List arr={[...users.slice(0, 10), ...item.slice(0, 10)]} />
            <div className={css.Div}>
                {divcomponts.map((e, index: number) =>
                    <div key={index} onClick={() => {
                        navigate(e.navigate);
                    }} className={`${css.divlink}`}>
                        <img className={css.Img} src={`${e.src}`} alt="" />

                        <div className='d-flex justify-content-center'>

                            <button className={css.btn}>{e.btn}</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Cardlist