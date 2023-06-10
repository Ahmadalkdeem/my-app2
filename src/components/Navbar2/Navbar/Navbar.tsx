import css from './css.module.scss'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import Topnav from '../TopNav/Topnav';
import { Sling as Hamburger } from 'hamburger-react'
import { useAppSelector } from '../../../app/hooks';
import { NavLink } from "react-router-dom";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { MdOutlineFavoriteBorder } from "react-icons/md";

function MyNavbar() {
    let { roles } = useAppSelector(e => e.user)
    const [count, setCount] = useState(false);
    const [display, setdisplay] = useState(false);
    const [navbarExpanded, setNavbarExpanded] = useState(false);
    function closenavbar() {
        setNavbarExpanded(false)
        setCount(false)
    }


    return (
        <>
            <p className={css.p}>משלוח חינם עד הדלת בהזמנות מעל ₪349</p>
            <header className={css.MyHeader}>
                <>
                    <Navbar className={`${css.MyNavbar}`} expand="xl" onToggle={() => setNavbarExpanded(!navbarExpanded)} expanded={navbarExpanded}>
                        <div>

                            <img className={css.logo} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzV_u0UjwQds2dccWrlW8TOF3RoJDRZ0-3Gv-7FUxIA&s" alt="logo" />
                            <NavLink className={css.icon} to='/Mycard'>
                                <TfiShoppingCartFull size={33} />
                            </NavLink>
                            <NavLink className={css.icon} to='/Favorites'>
                                <MdOutlineFavoriteBorder size={33} />
                            </NavLink>
                        </div>
                        <Navbar.Toggle onClick={() => {
                            setCount(e => !e)
                        }} className='p-0 border-0 shadow-none fw-bold' aria-controls="basic-navbar-nav">
                            <Hamburger size={25} toggled={count} />
                        </Navbar.Toggle>
                        <Navbar.Collapse in={navbarExpanded} id="basic-navbar-nav">
                            <Nav className={`me-auto d-flex align-items-center ${css.mylinks}`}>
                                <div>
                                    <NavLink onClick={closenavbar} onMouseEnter={() => {
                                        console.log('aaa');
                                    }} onMouseOut={() => { }} className={css.Mylink} to="/">בית</NavLink>
                                    <NavLink onClick={closenavbar} className={css.Mylink} to="/Brands">מותגים</NavLink>
                                    <NavLink onClick={closenavbar} className={css.Mylink} to="/about">אודות</NavLink>
                                    <NavLink onClick={closenavbar} className={css.Mylink} to="/connection/login">התחברות</NavLink>
                                    {roles[0] === 'admin' && <>
                                        <NavLink onClick={closenavbar} className={css.Mylink} to="/addproduct">הוספה מוצר</NavLink>
                                        <NavLink onClick={closenavbar} className={css.Mylink} to="/data">ביצועים</NavLink>
                                        <NavLink onClick={closenavbar} className={css.Mylink} to="/orders">הזמנות</NavLink>
                                        <NavLink onClick={closenavbar} className={css.Mylink} to="/users">משתמשים</NavLink>
                                    </>}
                                </div>
                                <Topnav />
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </>
                {display === false ? '' : <div onMouseEnter={() => {
                    setdisplay(true)
                }} onMouseOut={() => { setdisplay(false) }} className={css.divcatgres}></div>}
            </header>
        </>
    )
}

export default MyNavbar