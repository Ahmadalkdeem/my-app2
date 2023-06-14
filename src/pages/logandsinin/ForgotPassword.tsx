import { useState, useEffect } from 'react'
import css from './css.module.scss'
import axios from 'axios';
import { valMail, valpassword } from '../../validators/validators';
import { useAppDispatch } from '../../app/hooks';
import { Helmet } from "react-helmet";
import { updatedetalise } from '../../features/user/user';
import { Url } from '../../arrays/list';
const ForgotPassword = () => {
    window.onscroll = () => { }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    let Dispatch = useAppDispatch()
    const [username, setusername] = useState('');
    const [errusername, seterrusername] = useState('');
    const [password, setpassword] = useState('');
    const [errpassword, seterrpassword] = useState('');
    const [password2, setpassword2] = useState('');
    const [errpassword2, seterrpassword2] = useState('');

    const login = () => {
        if (valMail.test(username) && valpassword.test(password) && valpassword.test(password2)) {
            axios.post(`${Url}api/auth/ForgotPassword`, { email: username, password: password, password2: password2 }).then((response) => {
                Dispatch(updatedetalise(response.data))
            }).catch(e => {
                console.log(e);
            })
        }
        if (!valMail.test(username)) {
            seterrusername('המייל לא תקין')

        } else {
            seterrusername('')
        }
        if (!valpassword.test(password)) {
            seterrpassword('הסיסמה צרכיה להיוות 8-14 שמיכלה מספרים ואותיות באגלית')

        } else {
            seterrpassword('')
        }
        if (!valpassword.test(password2)) {
            seterrpassword2('הסיסמה צרכיה להיוות 8-14 שמיכלה מספרים ואותיות באגלית')

        } else {
            seterrpassword2('')
        }
    }
    return (
        <>
            <Helmet>
                <title>התחברו לחשבון שלכם | חנות האופנה המובילה באינטרנט</title>
                <meta name="description" content=" התחברו לחשבון שלכם ותוכלו לצפות בהזמנות, לעקוב אחרי המשלוחים שלכם ולנהל את פרטי החשבון שלכם. כנסו עכשיו!" />
                <meta name="keywords" content="התחברות, חשבון, משלוחים, פרטים, חנות, אינטרנט, קניות" />
            </Helmet>
            <h5 className={css.h5}>שיחזור סיסמה :</h5>
            <form className={`d-flex flex-column justify-content-center align-items-center p-2 ${css.form}`} action="">
                <label className={css.lable} htmlFor="email">המייל:</label>
                <input value={username} onChange={(e) => {
                    setusername(e.target.value)
                }} className={css.input} type="text" id='email' />
                <p className={css.P}>{errusername === '' ? '' : errusername}</p>
                <label className={css.lable} htmlFor="password">הסיסמה הישנה:</label>
                <input value={password} onChange={(e) => {
                    setpassword(e.target.value)
                }} className={css.input} type="text" id='password' />
                <p className={css.P}>{errpassword === '' ? '' : errpassword}</p>
                <label className={css.lable} htmlFor="password2">הסיסמה החדשה:</label>
                <input value={password2} onChange={(e) => {
                    setpassword2(e.target.value)
                }} className={css.input} type="text" id='password2' />
                <p className={css.P}>{errpassword2 === '' ? '' : errpassword2}</p>

                <input className={css.btn} type="button" value="כניסה" onClick={login} />
            </form></>
    )
}

export default ForgotPassword