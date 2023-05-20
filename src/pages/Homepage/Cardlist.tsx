import React, { useEffect } from 'react'
import MyCard from '../../components/card/Card'
import css from './css.module.scss'
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks'
import Myslider from '../../components/slider/Slider';
import MYCarousel from '../../components/corsla/Carousel';
import img from './Red Modern New Arrival Shoes Instagram Post.png'
import img2 from './White Modern T-shirts Giveaway (A4 Document).png'
import img3 from './Blue Minimalist Fashion Denim Facebook Post.png'
import { Helmet } from "react-helmet";


function Cardlist() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const { loading, users, error } = useAppSelector((s) => s.cardshirts);
    const { loading3, users3, error3 } = useAppSelector((s) => s.cardshose);
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
            <h2 className={css.h2}>המוצרים החמים</h2>
            <Container className={`Container ${css.Container}`} fluid>
                <Row xs={2} sm={3} lg={4} xxl={5}>
                    {users.slice(0, 10).map((product: any, index: number) => (
                        <Col key={index} className="mt-2 p-1">
                            <MyCard key={index}
                                {...product} />
                        </Col>
                    ))}
                    {users3.slice(0, 10).map((product: any, index: number) => (
                        <Col key={index} className="mt-2 p-1">
                            <MyCard key={index}
                                {...product} />
                        </Col>
                    ))}
                </Row>
            </Container>

            <div className={css.Div}>
                <div onClick={() => {
                    navigate(`/Shirts`);
                }} className={`${css.divlink}`}>
                    <img className={css.Img} src={img2} alt="" />

                    <div className='d-flex justify-content-center'>

                        <button className={css.btn}>חולצות</button>
                    </div>
                </div>
                <div onClick={() => {
                    navigate(`/pants`);
                }} className={`${css.divlink}`}>
                    <img className={css.Img} src={img3} alt="" />
                    <div className='d-flex justify-content-center'>

                        <button className={css.btn}>מכנסיים</button>
                    </div>

                </div>
                <div onClick={() => {
                    navigate(`/shoes`);
                }} className={`${css.divlink}`}>
                    <img className={css.Img} src={img} alt="" />
                    <div className='d-flex justify-content-center'>

                        <button className={css.btn}>נעליים</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Cardlist