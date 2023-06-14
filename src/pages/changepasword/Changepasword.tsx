import { useState, useEffect } from 'react'
import css from './css.module.scss'
import axios from 'axios';
import { valpassword } from '../../validators/validators';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Url } from '../../arrays/list';
import Swall from '../../components/swal/Swal';
const Changepasword = () => {
    window.onscroll = () => { }
    let Navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    let { token } = useParams();
    const [password, setpassword] = useState('');
    const [errpassword, seterrpassword] = useState('');
    const Restartpassword = () => {
        if (valpassword.test(password)) {
            axios.post(`${Url}api/auth/Restartpassword2`, { token: token, password: password }).then((response) => {
                console.log(response);

                if (response.data.good === 'good') {
                    Swall({ titel: 'סיסמה התעדכנה בהצלחה', timer: 2000 })

                }
                Navigate('/connection/login')
            }).catch(e => {
                console.log(e);
            })
        }
        if (!valpassword.test(password)) {
            seterrpassword('הסיסמה צרכיה להיוות 8-14 שמיכלה מספרים ואותיות באגלית')
        } else {
            seterrpassword('')
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
                <label className={css.lable} htmlFor="pasword1">הסיסמה החדשה:</label>
                <input value={password} onChange={(e) => {
                    setpassword(e.target.value)
                }} className={css.input} type="password" id='pasword1' />
                <p className={css.P}>{errpassword === '' ? '' : errpassword}</p>

                <input className={css.btn} type="button" value="שיחזור סיסמה" onClick={Restartpassword} />
            </form></>
    )
}

export default Changepasword