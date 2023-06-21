import React, { useState } from 'react'
import css from './css2.module.scss'
import { MdAccountCircle } from "react-icons/md";
import { AiFillShopping } from "react-icons/ai";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { MdOutlineFavoriteBorder } from "react-icons/md";


const Navbae2 = () => {
    const navigate = useNavigate();
    let { roles } = useAppSelector(e => e.user)
    return (
        <>
            <div className={css.divlogo}>
                <img onClick={() => { navigate('/') }} className={css.logo} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzV_u0UjwQds2dccWrlW8TOF3RoJDRZ0-3Gv-7FUxIA&s" alt="logo" />
            </div>
            <div className={css.Navbar}>
                <div className='d-flex g-2'>
                    <div onClick={() => { navigate('/Mycard') }} className={css.divicon}>
                        <span>Shoping</span>
                        <AiFillShopping size={18} />
                    </div>
                    <div onClick={() => { navigate('/connection/login') }} className={css.divicon}>
                        <span>account</span>
                        <MdAccountCircle size={18} />
                    </div>

                </div>
                <div>
                    <div onClick={() => { navigate('/Favorites') }}>
                        <MdOutlineFavoriteBorder color='red' size={28} />
                    </div>
                </div>
            </div >
            <div className={`${css.Navbar} ${css.Navbar2}`}>
                <NavLink className={css.link} to="/Shirts">חולצות</NavLink>
                <NavLink className={css.link} to="/pants">מכנסיים</NavLink>
                <NavLink className={css.link} to="/shoes">נעליים</NavLink>
                <NavLink className={css.link} to="/Brands">מותגים</NavLink>
                <NavLink className={css.link} to="/about">אודות</NavLink>
                {roles[0] === 'admin' && <><NavLink className={css.link} to="/addproduct">הוספה מוצר</NavLink>
                    <NavLink className={css.link} to="/data">ביצועים</NavLink>
                    <NavLink className={css.link} to="/orders">הזמנות</NavLink>
                    <NavLink className={css.link} to="/users">משתמשים</NavLink>
                </>}
            </div>
        </>
    )
}

export default Navbae2