import css from './css.module.scss'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import Topnav from '../TopNav/Topnav';
import { Sling as Hamburger } from 'hamburger-react'
import { useAppSelector } from '../../../app/hooks';
import { NavLink } from "react-router-dom";
import { TfiShoppingCartFull } from "react-icons/tfi";
import NavDropdown from 'react-bootstrap/NavDropdown';

function MyNavbar() {
    let { id, email, roles, username, accessToken } = useAppSelector(e => e.user)
    const [count, setCount] = useState(false);
    const [color, setcolor] = useState(false);
    const [display, setdisplay] = useState(false);
    const [navbarExpanded, setNavbarExpanded] = useState(false);
    function closenavbar() {
        setNavbarExpanded(false)
        setCount(false)
    }
    window.onscroll = () => {
        if (window.scrollY >= 66) {
            setcolor(true)
        } else {
            setcolor(false)
        }
    }

    return (
        <>
            <p className={css.p}>شحن مجاني حتى باب المنزل لكل طلبية فوق ₪349</p>
            <header className={color === true ? css.MyHeader : `${css.MyHeader} ${css.MyHeader2}`}>
                <>
                    <Navbar className={`${css.MyNavbar}`} expand="lg" onToggle={() => setNavbarExpanded(!navbarExpanded)} expanded={navbarExpanded}>
                        <div>

                            <img className={css.logo} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzV_u0UjwQds2dccWrlW8TOF3RoJDRZ0-3Gv-7FUxIA&s" alt="logo" />
                            <NavLink className={css.icon} to='/Mycard'>
                                <TfiShoppingCartFull size={33} />
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
                                    }} onMouseOut={() => { }} className={css.Mylink} to="/home">בית</NavLink>
                                    <NavLink onClick={closenavbar} className={css.Mylink} to="/about">אודות</NavLink>
                                    <NavLink onClick={closenavbar} className={css.Mylink} to="/connection/login">התחברות</NavLink>
                                    {roles[0] === 'admin' && <><NavLink onClick={closenavbar} className={css.Mylink} to="/addproduct">הוספה מוצר</NavLink>
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
                    console.log('aaa');
                    setdisplay(true)
                }} onMouseOut={() => { setdisplay(false) }} className={css.divcatgres}></div>}
            </header>
        </>
    )
}

export default MyNavbar