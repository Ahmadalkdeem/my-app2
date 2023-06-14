import React from 'react'
import css from './a404.module.scss'
import { NavLink } from "react-router-dom";
import { BiSad } from 'react-icons/bi';
function Notfoud() {
    window.onscroll = () => { }
    return (
        <div className={css.body}>
            <p className={css.p}>
                4<BiSad />4
            </p>
            <p className={css.p2}>! ops The page is not found</p>
            <NavLink className={css.link} to="/">back</NavLink>

        </div>
    )
}

export default Notfoud