import React from 'react'
import css from './a404.module.scss'
import { NavLink } from "react-router-dom";
import { BiSad } from 'react-icons/bi';
function Notfoud() {
    // const navv = useNavigate();

    return (
        <div className={css.mybody}>
            <p className={css.myp}>
                4<BiSad />4
            </p>
            <p className={css.myp2}>! ops The page is not found</p>
            <NavLink className={css.link} to="/">back</NavLink>

        </div>
    )
}

export default Notfoud