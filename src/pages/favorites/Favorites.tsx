import React from 'react'
import { useAppSelector } from '../../app/hooks'
import List from '../../components/List/List'
import css from './css.module.scss'
import H2 from '../../components/h2/H2'
const Favorites = () => {
    window.onscroll = () => { }
    let { arr } = useAppSelector(e => e.Favorites)
    return (
        <>
            <H2 h2='Favorites' />
            {arr.length === 0 ? <div className={css.div}></div> : <List arr={arr} />}
        </>
    )
}

export default Favorites