import { useState, useEffect } from 'react'
import css from './css.module.scss'
import axios from 'axios';
import { valMail } from '../../validators/validators';
import { Helmet } from "react-helmet";
import { Url } from '../../arrays/list';
import Swal from 'sweetalert2';
const Restartpassword = () => {
    window.onscroll = () => { }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [username, setusername] = useState('');
    const [errusername, seterrusername] = useState('');


    const Restartpassword = () => {
        if (valMail.test(username)) {
            axios.post(`${Url}api/auth/Restartpassword`, { email: username }).then((response) => {
                console.log(response);

                if (response.data.good === 'good') {
                    Swal.fire({
                        title: 'תשנה את הססיסמה דרך הקישור במייל',
                        icon: 'success',
                    })
                }
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