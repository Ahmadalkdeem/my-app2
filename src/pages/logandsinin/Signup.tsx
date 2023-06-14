import { useState, useEffect } from 'react'
import axios from 'axios'
import css from './css.module.scss'
import { valMail, valpassword, valusername } from '../../validators/validators';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { updatedetalise } from '../../features/user/user';
import { Helmet } from "react-helmet";
import Swall from '../../components/swal/Swal';
import { Url } from '../../arrays/list';
const Signup = () => {
    window.onscroll = () => { }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    let Dispatch = useAppDispatch()
    let Navigate = useNavigate()
    const [username, setusername] = useState('');
    const [errusername, seterrusername] = useState('');
    const [password, setpassword] = useState('');
    const [errpassword, seterrpassword] = useState('');
    const [email, setemail] = useState('');
    const [erremail, seterremail] = useState('');

    const sinup = () => {
        if (!valpassword.test(password) && password !== '') { seterrpassword('הסיסמה צרכיה להיוות 8-14 שמיכלה מספרים ואותיות באגלית') } else if (valpassword.test(password)) { seterrpassword('') }
        if (password === '') { seterrpassword('תקליד  הסיסמה') }


        if (!valusername.test(username) && username !== '') { seterrusername('השם משתמש צריך להיות בעברית ולפחות שני תווים') } else if (valusername.test(username)) { seterrusername('') }
        if (username === '') { seterrusername('תקליד  השם משתמש') }


        if (!valMail.test(email) && email !== '') { seterremail("המייל לא תקין") } else if (valMail.test(email)) { seterremail('') }
        if (email === '') { seterremail('תקליד מייל') }

        if (valpassword.test(password) && valusername.test(username) && valMail.test(email)) {
            axios.post(`${Url}api/auth/signup`, { username: username, email: email, password: password }).then((response) => {
                console.log(response.data);
                Dispatch(updatedetalise(response.data.id))
                Navigate('/')
                Swall({ titel: 'ההרשמה בוצעה בהצלחה', timer: 1500 })

            }).catch((e) => {
                if (e.response.data.message === 'Email already exists') {
                    seterrpassword('המייל רשום')
                }
            })
        } else {
            console.log('bb');

        }
    }


    return (
        <>
            <Helmet>
                <title>התחברו לחשבון שלכם | חנות האופנה המובילה באינטרנט</title>
                <meta name="description" content=" התחברו לחשבון שלכם ותוכלו לצפות בהזמנות, לעקוב אחרי המשלוחים שלכם ולנהל את פרטי החשבון שלכם. כנסו עכשיו!" />
                <meta name="keywords" content="התחברות, חשבון, משלוחים, פרטים, חנות, אינטרנט, קניות" />
            </Helmet>
            <h5 className={css.h5}>הרשמה :</h5>
            <form className={`d-flex flex-column justify-content-center align-items-center p-2 ${css.form}`} action="">
                <label className={css.lable} htmlFor="username">השם המלא:</label>
                <input onChange={(e) => {
                    setusername(e.target.value)
                }} value={username} className={css.input} type="text" id='username' />
                <p className={css.P}>{errusername === '' ? '' : errusername}</p>
                <label className={css.lable} htmlFor="email">מייל:</label>
                <input value={email} onChange={(e) => {
                    setemail(e.target.value)
                }} className={css.input} type="text" id='email' />
                <p className={css.P}>{erremail === '' ? '' : erremail}</p>

                <label className={css.lable} htmlFor="pasword">סיסמה:</label>
                <input value={password} onChange={(e) => {
                    setpassword(e.target.value)
                }} className={css.input} type="password" id='pasword' />
                <p className={css.P}>{errpassword === '' ? '' : errpassword}</p>

                <input onClick={sinup} className={css.btn} type="button" value="הרשמה" />
            </form></>
    )
}

export default Signup