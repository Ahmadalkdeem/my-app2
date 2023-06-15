import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import css from './css.module.scss'
import { Link } from 'react-router-dom';
import { brandstype } from '../../@types/Mytypes';
// import { brands2 } from '../../arrays/list';
const brands: brandstype[] = [
    { value: 'Zara', src: 'https://cdn.mos.cms.futurecdn.net/UkabSwd9CX7buvuAztJG8J-320-80.jpg' },
    { value: 'H&M', src: 'https://1000logos.net/wp-content/uploads/2017/02/Colors-of-the-HM-Logo.jpg' },
    { value: `Victoria's Secret`, src: `https://1000logos.net/wp-content/uploads/2017/12/Victoria-Secret-Logo.jpg` },
    { value: `Burberry`, src: `https://1000logos.net/wp-content/uploads/2016/10/Burberry-Logo-2018.png` },
    { value: `Tommy Hilfiger`, src: `https://logowik.com/content/uploads/images/tommy-hilfiger3583.logowik.com.webp` },
    { value: `Nike`, src: `https://www.shutterstock.com/image-photo/kiev-ukraine-march-31-2015-260nw-275940803.jpg` },
    { value: `Adidas`, src: `https://thumbs.dreamstime.com/b/adidas-ag-multinational-corporation-founded-headquartered-herzogenaurach-germany-designs-manufactures-shoes-139136442.jpg` },
    { value: `Ralph Lauren`, src: `https://logos-world.net/wp-content/uploads/2020/04/Ralph-Lauren-Symbol.png` },
    { value: `Calvin Klein`, src: `https://1000logos.net/wp-content/uploads/2016/10/calvin-klein-symbol.jpg` },
    { value: `Gap`, src: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS963uzNBvaXZ97Eck9C9eQ9stlAcsHs2XktXciuD40g&s` },
    { value: `Mango`, src: `https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Mango-logo.jpg/2560px-Mango-logo.jpg` },
    { value: `Ted Baker`, src: `https://logonoid.com/images/ted-baker-logo.jpg` },
    { value: `Versace`, src: `https://images.ikrix.com/product_images/original/SL10261-009_04-4c77f9.jpg` },
    { value: `Gucci`, src: `https://logowik.com/content/uploads/images/493_gucci.jpg` },
    { value: `Balmain`, src: `https://1000logos.net/wp-content/uploads/2020/09/Balmain-Logo-1945.jpg` },
    { value: `Dior`, src: `https://logowik.com/content/uploads/images/christian-dior-new3874.jpg` },
    { value: `Berberry`, src: `https://1000logos.net/wp-content/uploads/2016/10/Burberry-Logo-2018.png` },
    { value: `Louis Vuitton`, src: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-syWtyNstSFScxr3ECgHohLzc-zVdAOSEE13q0bYmeg&s` },
    { value: `Armani`, src: `https://logowik.com/content/uploads/images/877_emporioarmani.jpg` },
    { value: `Bershka`, src: `https://1000logos.net/wp-content/uploads/2023/04/bershka-logo.jpg` },
];
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
            {brands.map((e, i: number) =>
                <Link to={`/Brands/${e.value}`} key={i} >
                    <img className={css.img} src={e.src} alt={e.value} />
                </Link>
            )}
        </Slider>
    );
};

export default Myslider;
