import { useState, useEffect } from 'react'
import css from './css.module.scss'
import axios from 'axios';
import { valMail, valpassword } from '../../validators/validators';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { updatedetalise } from '../../features/user/user';
import { Url } from '../../arrays/list';
const Restartpassword = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    let Navigate = useNavigate()
    let Dispatch = useAppDispatch()
    const [username, setusername] = useState('');
    const [errusername, seterrusername] = useState('');


    const Restartpassword = () => {
        if (valMail.test(username)) {
            axios.post(`${Url}api/auth/Restartpassword`, { email: username }).then((response) => {
                if (response.data.good === 'good') { }
            }).catch(e => {
                console.log(e);
            })
        }
        if (!valMail.test(username)) {
            seterrusername('המייל לא תקין')

        } else {
            seterrusername('')
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
                <input className={css.btn} type="button" value="כניסה" onClick={Restartpassword} />
            </form></>
    )
}

export default Restartpassword