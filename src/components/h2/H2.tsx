import React from 'react'
import css from './css.module.scss'
const H2 = (props: { h2: string }) => {
    return (
        <h2 className={css.h2}>{props.h2}</h2>
    )
}

export default H2