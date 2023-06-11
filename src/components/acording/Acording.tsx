import React, { useState } from 'react'
import css from './acording.module.scss'
import { acording } from '../../@types/Acording'
const data: acording[] = [
    {
        question: 'תיאור', answer: ``
    },
    {
        question: 'משלוחיים', answer: `עד הבית או למקום העבודה שלך? משלוח מהיר ובטוח לאן שאת תחליטי.

ברכישה עד 399₪ | 19.9₪

ברכישה מעל 399₪ | משלוח חינם
` }
]
function Acording2(e: { aa: string }) {
    data[0].answer = e.aa
    const [acording, setacording] = useState<any>(null)
    const toggle = (p: number) => {
        if (acording === p) {
            return setacording(null)
        }
        setacording(p)
    }

    return (
        <div>
            {data.map((item: acording, i: number) => (
                <div key={i} className={css.item}>
                    <div className={`${css.titel} d-flex justify-content-between`} onClick={() => { toggle(i) }} >
                        <h5>{item.question}</h5>
                        <h5 className='fw-bold '>{acording === i ? '-' : '+'}</h5>
                    </div>
                    <div className={acording === i ? `${css.acordingn} ${css.conact}` : `${css.acordingn}`}>
                        {item.answer}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Acording2