import { useState, useEffect } from 'react'
import css from './css.module.scss'
import axios from 'axios';
import { valMail } from '../../validators/validators';
import { useAppDispatch } from '../../app/hooks';
import { addItem } from '../../features/cards/users';
import { useAppSelector } from '../../app/hooks';
import { Url } from '../../arrays/list';
const User = () => {
    const { accessToken } = useAppSelector((s) => s.user);
    const { arr } = useAppSelector((s) => s.users);

    let Dispatch = useAppDispatch()
    const [username, setusername] = useState('');
    const [errusername, seterrusername] = useState('');

    const Serahe = () => {
        if (valMail.test(username)) {
            let find = arr.find((e) => e.email === username)
            if (find !== undefined) {
                setusername('')
                seterrusername('')
                return Dispatch(addItem(find))
            }
            axios.get(`${Url}users/getuser`, { params: { email: username, accessToken: accessToken } }).then((response) => {
                setusername('')
                seterrusername('')

                Dispatch(addItem(response.data))
            }).catch(e => {
                if (e.response.data.message === 'No Such User') {
                    seterrusername('המייל לא קיים')
                }
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
            <form className={`d-flex flex-column p-2`} action="">
                <label htmlFor="email">המייל:</label>
                <div className='d-flex'>

                    <input value={username} onChange={(e) => {
                        setusername(e.target.value)
                    }} className='w-100' type="text" id='email' />
                    <input type="button" value="חיפוש" onClick={Serahe} />
                </div>
                <p className={css.P}>{errusername === '' ? '' : errusername}</p>


            </form>
        </>
    )
}

export default User