import { useState, useEffect } from 'react'
import css from './css.module.scss'
import axios from 'axios';
import { valMail, valpassword } from '../../validators/validators';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { updatedetalise } from '../../features/user/user';
const Restartpassword = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    let Navigate = useNavigate()
    let Dispatch = useAppDispatch()
    const [username, setusername] = useState('');
    const [errusername, seterrusername] = useState('');
    const [number, setnumber] = useState('');
    const [errnumber, seterrnumber] = useState('');
    const [password, setpassword] = useState('');
    const [errpassword, seterrpassword] = useState('');
    console.log(number);

    const Restartpassword = () => {
        if (valMail.test(username)) {
            axios.post('http://localhost:3001/api/auth/Restartpassword', { email: username }).then((response) => {
                // Dispatch(updatedetalise(response.data))
                console.log(response);
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
    const Restartpassword2 = () => {
        if (valMail.test(username) && valpassword.test(password)) {
            axios.post('http://localhost:3001/api/auth/Restartpassword2', { email: username, password: password, number: number }).then((response) => {
                // Dispatch(updatedetalise(response.data))
                console.log(response);
                if (response.data.good === 'good') {
                    console.log(true);

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
        if (!valpassword.test(username)) {
            seterrpassword('הסיסמה לא תקינה')

        } else {
            seterrpassword('')
        }
        if (errnumber === '') {
            seterrnumber('תקליד את הקוד')

        } else {
            seterrnumber('')
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

                <label className={css.lable} htmlFor="pasword">הקוד הסודי:</label>
                <input onChange={(e) => {
                    setnumber(`${e.target.value}`)
                }} className={css.input} type="number" id='pasword' />
                <p className={css.P}>{errnumber === '' ? '' : errnumber}</p>
                <label className={css.lable} htmlFor="pasword1">הסיסמה החדשה:</label>
                <input value={password} onChange={(e) => {
                    setpassword(e.target.value)
                }} className={css.input} type="password" id='pasword1' />
                <p className={css.P}>{errpassword === '' ? '' : errpassword}</p>

                <input className={css.btn} type="button" value="כניסה" onClick={Restartpassword2} />
            </form></>
    )
}

export default Restartpassword