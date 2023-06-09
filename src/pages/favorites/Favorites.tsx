import React from 'react'
import { useAppSelector } from '../../app/hooks'
import List from '../../components/List/List'
import css from './css.module.scss'
const Favorites = () => {
    let { arr } = useAppSelector(e => e.Favorites)

    return (
        <>
            <h2 className={css.h2}>Favorites</h2>
            {arr.length === 0 ? <div className={css.div}></div> : <List arr={arr} />}
        </>
    )
}

export default Favorites