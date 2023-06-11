import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import css from './css.module.scss'
import { Link } from 'react-router-dom';
import { brands2 } from '../../arrays/list';
const Myslider = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 100,
        cssEase: "linear",
        responsive: [

            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,

                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 380,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };
    return (
        <Slider className={css.slider} {...settings} dots={false}>
            {brands2.map((e, i: number) =>
                <Link to={`/Brands/${e.value}`} key={i} > <img className={css.img} src={e.src} alt={e.value} /></Link>
            )}
        </Slider>
    );
};

export default Myslider;
