import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import css from "./css.module.scss"
import Acording2 from '../acording2/Acording';
import { NavLink } from "react-router-dom";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';
import Topnav from '../Navbar2/TopNav/Topnav';
function OffcanvasExample() {
    const [categres, setcategres] = useState(window.innerWidth)
    const [show, setshow] = useState(false)
    let { id, email, roles, username, accessToken } = useAppSelector(e => e.user)

    window.onresize = () => {
        setcategres(window.innerWidth)
        if (window.innerWidth > 991.5) {
            setshow(false)
        }
    }
    return (
        <>
            {['lg'].map((expand) => (
                <Navbar key={expand} expand={expand} className={css.MyHeader}>
                    {/* <Container fluid> */}
                    <span>

                        <img className={css.logo} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzV_u0UjwQds2dccWrlW8TOF3RoJDRZ0-3Gv-7FUxIA&s" alt="logo" />
                        <Link className={css.icon} to='/Mycard'>
                            <TfiShoppingCartFull size={33} />
                        </Link>
                    </span>
                    <Navbar.Toggle className='border-0 shadow-none' aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={() => {
                        setshow(true)
                    }} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                        className='border-0'
                        show={show}
                    >
                        <Offcanvas.Header>
                            <img className={css.logo} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwzV_u0UjwQds2dccWrlW8TOF3RoJDRZ0-3Gv-7FUxIA&s" alt="logo" />
                            <button onClick={() => {
                                setshow(false)
                            }}>aa</button>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="d-flex w-100 justify-content-between">
                                <div>

                                    <NavLink onClick={() => { setshow(false) }} className={css.Mylink} to="/home">בית</NavLink>
                                    <NavLink onClick={() => { setshow(false) }} className={css.Mylink} to="/about">אודות</NavLink>
                                    <NavLink onClick={() => { setshow(false) }} className={css.Mylink} to="/connection/login">התחברות</NavLink>
                                    {roles[0] === 'admin' && <><NavLink onClick={() => { setshow(false) }} className={css.Mylink} to="/addproduct">הוספה מוצר</NavLink>
                                        <NavLink onClick={() => { setshow(false) }} className={css.Mylink} to="/data">ביצועים</NavLink>
                                        <NavLink onClick={() => { setshow(false) }} className={css.Mylink} to="/orders">הזמנות</NavLink>
                                        <NavLink onClick={() => { setshow(false) }} className={css.Mylink} to="/users">משתמשים</NavLink>
                                    </>}
                                </div>
                                <Topnav />
                                {categres < 991.5 && <Acording2 />}
                            </Nav>

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    {/* </Container> */}
                </Navbar>
            ))}
        </>
    );
}

export default OffcanvasExample;