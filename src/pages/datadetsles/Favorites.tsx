import { useEffect, useState } from 'react'
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import css from './css.module.scss'
import { addarr } from '../../features/user/Performence';
import List from '../../components/List/List';
import H2 from '../../components/h2/H2';
import { Url } from '../../arrays/list'
import Spiner from '../../components/Spiner/Spiner';
import Fillter from '../../components/fillter/Fillter';
const Favorites = () => {
    let Dispatch = useAppDispatch()
    const { accessToken } = useAppSelector((s) => s.user);
    const { data4 } = useAppSelector((s) => s.Performence);
    const { Favoriteproduct } = useAppSelector((s) => s.fillter);
    const [Loading, setloding] = useState(false)
    useEffect(() => {
        window.scrollTo(0, 0)
        if (data4.length < 1) {
            setloding(true)
            favorites()
        }
    }, []);

    async function favorites() {
        axios.get(`${Url}Performence/favorites`, { params: { accessToken: accessToken, ...Favoriteproduct } }).then((response) => {
            console.log(response);
            setloding(false)
            Dispatch(addarr({ name: 'data4', arr: response.data[0].products }))
        }).catch((err: any) => {
            console.log(err);
        })
    }
    return (

        <>
            <H2 h2='Favorites' />
            <div className={css.selestdiv}  >
                <Fillter name='Favoriteproduct' />

                <button className={css.btn} onClick={() => {
                    setloding(true)
                    favorites()
                }
                }>Serahe</button>

            </div>
            {Loading === false ? <List arr={data4} /> : <Spiner />}
        </>
    )
}

export default Favorites