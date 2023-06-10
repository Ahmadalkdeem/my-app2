import { useState, useEffect } from 'react'
import css from './css.module.scss'
import axios from 'axios';
import { valMail } from '../../validators/validators';
import { useAppDispatch } from '../../app/hooks';
import { addfindItems, addItems } from '../../features/cards/orderdetales';
import { useAppSelector } from '../../app/hooks';
import { Url } from '../../arrays/list';
const Order = () => {
    const { accessToken } = useAppSelector((s) => s.user);

    let Dispatch = useAppDispatch()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [email, setemail] = useState('');
    const [erremail, seterremail] = useState('');

    const login = () => {
        if (valMail.test(email)) {

            axios.get(`${Url}carts/getoneorder`, { params: { email: email, accessToken: accessToken } }).then((response) => {
                if (response.data.length === 0) { return seterremail('אין הזמנות להמייל הזה') }
                setemail('')
                seterremail('')
                // Dispatch(addItems(response.data))
                Dispatch(addfindItems(response.data))
            }).catch(e => {
                if (e.response.data.message === 'No Such User') {
                    seterremail('המזה לא קיים')
                } else {
                    seterremail('הפעולה נכשלה')

                }
                console.log(e);

            })
        }
        if (!valMail.test(email)) {
            seterremail('המזה לא תקין')

        } else {
            seterremail('')
        }

    }
    return (
        <>
            <form className={`d-flex flex-column  p-2 ${css.form}`} action="">
                <label className={css.lable} htmlFor="email">המייל:</label>
                <div className='d-flex'>

                    <input value={email} onChange={(e) => {
                        setemail(e.target.value)
                    }} className='w-100' type="text" id='email' />
                    <input className={css.btn} type="button" value="חיפוש" onClick={login} />
                </div>
                <p className={css.P}>{erremail === '' ? '' : erremail}</p>


            </form>
        </>
    )
}

export default Order