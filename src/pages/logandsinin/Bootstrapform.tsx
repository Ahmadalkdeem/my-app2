import { useState, useEffect } from 'react';
import css from './css.module.scss'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
function Bootstrapform() {
    window.onscroll = () => { }
    let Navigate = useNavigate()
    const [form, setform] = useState('כניסה');
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Helmet>
                <title>התחברו לחשבון שלכם | חנות האופנה המובילה באינטרנט</title>
                <meta name="description" content=" התחברו לחשבון שלכם ותוכלו לצפות בהזמנות, לעקוב אחרי המשלוחים שלכם ולנהל את פרטי החשבון שלכם. כנסו עכשיו!" />
                <meta name="keywords" content="התחברות, חשבון, משלוחים, פרטים, חנות, אינטרנט, קניות" />
            </Helmet>
            <div className={css.div}>
                <button onClick={() => { setform('כניסה'); Navigate('/connection/login') }} className={form === 'כניסה' ? `${css.btnActiv}` : `${css.btn2}`}>כניסה</button>
                <button onClick={() => { setform('הרשמה'); Navigate('/connection/signup') }} className={form === 'הרשמה' ? `${css.btnActiv}` : `${css.btn2}`}>הרשמה</button>
            </div>


            <Outlet />
        </>
    )
}

export default Bootstrapform

