import React from 'react'
import css from './a404.module.scss'
import { useNavigate } from "react-router-dom";
import { BiSad } from 'react-icons/bi';
function Ops(props: { p: string }) {
    const Navigate = useNavigate()
    return (
        <div className={css.body}>
            <p className={css.p}>
                4<BiSad />4
            </p>
            {props.p !== '' && <>
                <p className={css.p2}>{props.p}</p>
                <button className={css.link} onClick={() => { Navigate(-1) }}>back</button>
            </>}

        </div>
    )
}

export default Ops