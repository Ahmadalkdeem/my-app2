import { useState, useEffect } from 'react'
import css from './css.module.scss'
import axios from 'axios';
import { valMail, valpassword } from '../../validators/validators';
import { updatedetalise } from '../../features/user/user';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

const Login = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    let Navigate = useNavigate()
    let Dispatch = useAppDispatch()
    const [username, setusername] = useState('');
    const [errusername, seterrusername] = useState('');
    const [password, setpassword] = useState('');
    const [errpassword, seterrpassword] = useState('');
    const login = () => {
        if (!valpassword.test(password)) {
            seterrpassword('הסיסמה לא תקינה')
        } else {
            seterrpassword('')
        }
        if (!valMail.test(username)) {
            seterrusername('המייל לא תקין')

        } else {

            seterrusername('')
        }
        if (valpassword.test(password) && valMail.test(username)) {
            axios.post('http://localhost:3001/api/auth/signin', { email: username, password: password }).then((response) => {
                console.log(response.data);

                Dispatch(updatedetalise(response.data))
                Navigate('/')
                seterrusername('')
                setusername('')
                seterrpassword('')
                setpassword('')
            }).catch(e => {
                console.log(e);

                seterrpassword('המייל או הסיסמה שגוים')
            })
        }


    }
    return (
        <>
            <Helmet>
                <title>התחברו לחשבון שלכם | חנות האופנה המובילה באינטרנט</title>
                <meta name="description" content=" התחברו לחשבון שלכם ותוכלו לצפות בהזמנות, לעקוב אחרי המשלוחים שלכם ולנהל את פרטי החשבון שלכם. כנסו עכשיו!" />
                <meta name="keywords" content="התחברות, חשבון, משלוחים, פרטים, חנות, אינטרנט, קניות" />
            </Helmet>
            <h5 className={css.h5}>כניסה :</h5>
            <form className={`d-flex flex-column justify-content-center align-items-center p-2 ${css.form}`} action="">
                <label className={css.lable} htmlFor="username1">שם משתמש:</label>
                <input value={username} onChange={(e) => {
                    setusername(e.target.value)
                }} className={css.input} type="text" id='username1' />
                <p className={css.P}>{errusername === '' ? '' : errusername}</p>
                <label className={css.lable} htmlFor="pasword1">סיסמה:</label>
                <input value={password} onChange={(e) => {
                    setpassword(e.target.value)
                }} className={css.input} type="password" id='pasword1' />
                <p className={css.P}>{errpassword === '' ? '' : errpassword}</p>
                <input className={css.btn} type="button" value="כניסה" onClick={login} />
                <div className={css.div2}>
                    {/* <Link to='/connection/ForgotPassword' className={css.BtnForgotPassword} >שינוי סיסמה</Link>
                    <br /> */}
                    <Link to='/connection/Restartpassword' className={css.BtnForgotPassword} >שינוי סיסמה</Link>
                </div>
            </form></>
    )
}

export default Login