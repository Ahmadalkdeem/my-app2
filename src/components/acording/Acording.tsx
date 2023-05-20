import React, { useState } from 'react'
import css from './acording.module.scss'
import { acording } from '../../@types/Acording'
const data: acording[] = [
    {
        question: 'תיאור', answer: `עד הבית או למקום העבודה שלך? משלוח מהיר ובטוח לאן שאת תחליטי.

ברכישה עד 399₪ | 19.9₪

ברכישה מעל 399₪ | משלוח חינם

זמני אספקה:

כמו שאת יודעת כל נעל שלנו מיוצרת בעבודת יד במיוחד עבורך מהרגע שאת מזמינה אותה! פה בארץ!
מרגע הזמנה ועד שהנעל שלך מוכנה לשילוח לוקח עד 3 ימי עסקים. הנעל תגיע אליך עד 8 ימי עסקים מרגע ההזמנה.
תודה על הסבלנות זה ישתלם לך!

** כלות Brides - לבקשות למשלוח מהיר ודחוף, צרי קשר בטלפון, בוואטסאפ או השאירי פנייה פה בטופס` },
    { question: 'aa', answer: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam vitae laboriosam similique molestiae, iusto dolorum dolores a accusamus fuga facilis nemo ducimus voluptas, expedita, corrupti soluta in nesciunt fugiat dignissimos.' }
]
function Acording2(e: { aa: string }) {
    data[0].answer = e.aa
    const [acording, setacording] = useState(null)
    const toggle = (p: any) => {
        if (acording === p) {
            return setacording(null)
        }
        setacording(p)
    }

    return (
        <div>
            {data.map((item: acording, i: any) => (
                <div key={i} className={css.item}>
                    <div className={`${css.mytitel} d-flex justify-content-between`} onClick={() => { toggle(i) }} >
                        <h5>{item.question}</h5>
                        <h5 className='fw-bold '>{acording === i ? '-' : '+'}</h5>
                    </div>
                    <div className={acording === i ? `${css.acordingn} ${css.conact}` : `${css.acordingn}`}>
                        {/* <pre> */}
                        {/* <code> */}
                        {item.answer}
                        {/* </code> */}
                        {/* </pre> */}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Acording2