import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import css from './css.module.scss'

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
        <Slider className={css.slider} {...settings}>
            {/* {images.map((image, index) => ( */}
            <div>
                <img className={css.img} src={`https://st3.depositphotos.com/1050070/13243/i/450/depositphotos_132435338-stock-photo-logo-of-the-brand-nike.jpg`} alt={`product-`} />
            </div>
            <div>
                <img className={css.img} src={`https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg`} alt={`product-`} />
            </div>
            <div>
                <img className={css.img} src={`https://pbs.twimg.com/profile_images/1542757725985292288/P981nqTn_400x400.jpg`} alt={`product-`} />
            </div>
            <div>
                <img className={css.img} src={`https://logowik.com/content/uploads/images/522_lacoste.jpg`} alt={`product-`} />
            </div>
            <div>
                <img className={css.img} src={`https://logos-world.net/wp-content/uploads/2020/04/Ralph-Lauren-sign.png`} alt={`product-`} />
            </div>
            <div>
                <img className={css.img} src={`https://cdn.logojoy.com/wp-content/uploads/2018/05/30143419/95.png`} alt={`product-`} />
            </div>
            <div>
                <img className={css.img} src={`https://cdn.logojoy.com/wp-content/uploads/2018/05/30143419/95.png`} alt={`product-`} />
            </div>
            <div>
                <img className={css.img} src={`https://img.freepik.com/free-vector/illustration-boutique-shop-logo-stamp-banner_53876-3743.jpg`} alt={`product-`} />
            </div>
        </Slider>
    );
};

export default Myslider;
