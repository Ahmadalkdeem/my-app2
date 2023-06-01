import React, { useState } from 'react'
import css from './acording.module.scss'
import { acording } from '../../@types/Acording'
import { NavLink } from 'react-router-dom'
//categorys2
import { categorys2, categorys3, categorys4 } from '../../arrays/list'
const data: any = [
    {
        question: 'גברים', answer: [...categorys2, ...categorys3, ...categorys4]
    },
    {
        question: 'גברים', answer: [...categorys2, ...categorys3, ...categorys4]
    }
]
function Acording() {

    const [acording, setacording] = useState(null)
    const toggle = (p: any) => {
        if (acording === p) {
            return setacording(null)
        }
        setacording(p)
    }

    return (
        <div>
            {data.map((item: any, i: any) => (
                <div key={i} className={css.item}>
                    <div className={`${css.mytitel} d-flex justify-content-between`} onClick={() => { toggle(i) }} >
                        <h5>{item.question}</h5>
                        <h5 className='fw-bold '>{acording === i ? '-' : '+'}</h5>
                    </div>
                    <div className={acording === i ? `${css.acordingn} ${css.conact}` : `${css.acordingn}`}>
                        {/* <pre> */}
                        {item.answer.map((e: any) => {
                            <NavLink className={css.Mylink} to="/about">xxfbcf</NavLink>
                        })}
                        <NavLink className={css.Mylink} to="/about">{item.answer[0].value}</NavLink>
                        <NavLink className={css.Mylink} to="/about">{item.answer[1].value}</NavLink>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Acording