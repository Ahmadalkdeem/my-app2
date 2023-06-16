import React, { useState } from 'react'
import Select from 'react-select'
import { useParams } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { onchange } from '../../features/cards/arrays'
import css from './css.module.scss'
import { colourOptions, SizeOptions, SizeOptions2, stylelableOption, categorys4, categorys3, categorys2, categorys } from '../../arrays/list'
const Fillter = () => {
    const [mylist, setmylist] = useState('');
    let { Brands } = useParams();
    let item = useAppSelector((e) => e.arrays.arr.find((e) => e.name === Brands))

    let Dispatch = useAppDispatch()
    return (
        <>

            <Select
                isMulti
                value={item?.value.categorys}
                closeMenuOnSelect={false}
                options={categorys}
                onChange={(e: any) => {
                    return Dispatch(onchange({ name: item?.name, slice: { size: item?.value.size, colors: item?.value.colors, brands: item?.value.brands, stopfindusers: item?.value.stopfindusers, stopusers: item?.value.stopusers, categorys: e, categorys2: item?.value.categorys2 } }))
                }}
                styles={stylelableOption}
                onMenuOpen={() => {
                    setmylist('1')
                }}

                onMenuClose={() => {
                    setmylist('')
                }}
                className={mylist === '1' ? `${css.selest}` : `${css.selest2}`}
                placeholder='כתוגרי רשית' />
            <Select
                isMulti
                value={item?.value.categorys2}
                closeMenuOnSelect={false}
                options={[...categorys4, ...categorys3, ...categorys2]}
                onChange={(e: any) => {
                    return Dispatch(onchange({ name: item?.name, slice: { size: item?.value.size, colors: item?.value.colors, brands: item?.value.brands, stopfindusers: item?.value.stopfindusers, stopusers: item?.value.stopusers, categorys: item?.value.categorys, categorys2: e } }))
                }}
                styles={stylelableOption}
                onMenuOpen={() => {
                    setmylist('2')
                }}

                onMenuClose={() => {
                    setmylist('')
                }}
                className={mylist === '2' ? `${css.selest}` : `${css.selest2}`}
                placeholder='כתוגרי משנית'
            />
            <Select
                isMulti
                value={item?.value.size}
                closeMenuOnSelect={false}
                options={[...SizeOptions, ...SizeOptions2]}
                onChange={(e: any) => {
                    return Dispatch(onchange({ name: item?.name, slice: { size: e, colors: item?.value.colors, brands: item?.value.brands, stopfindusers: item?.value.stopfindusers, stopusers: item?.value.stopusers, categorys: item?.value.categorys, categorys2: item?.value.categorys2 } }))

                }}
                styles={stylelableOption}
                onMenuOpen={() => {
                    setmylist('3')
                }}

                onMenuClose={() => {
                    setmylist('')
                }}
                className={mylist === '3' ? `${css.selest}` : `${css.selest2}`}
                placeholder='מידות'
            />
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={colourOptions}
                value={item?.value.colors}
                onChange={(e: any) => {
                    return Dispatch(onchange({ name: item?.name, slice: { size: item?.value.size, colors: e, brands: item?.value.brands, stopfindusers: item?.value.stopfindusers, categorys: item?.value.categorys, categorys2: item?.value.categorys2, stopusers: item?.value.stopusers } }))

                }}
                styles={stylelableOption}
                onMenuOpen={() => {
                    setmylist('4')
                }}

                onMenuClose={() => {
                    setmylist('')
                }}
                className={mylist === '4' ? `${css.selest}` : `${css.selest2}`}
                placeholder='צבעים'
            />
        </>
    )
}

export default Fillter