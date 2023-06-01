import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { addItem, delteItem, search, onchange, addfindusers } from '../../features/cards/arrays'
import axios from 'axios'
import css from './css.module.scss'
import List from '../../components/List/List'
import { item, Cardtype } from '../../@types/Mytypes'
import Spiner from '../../components/Spiner/Spiner'
import { brands, colourOptions, SizeOptions, SizeOptions2, stylelableOption } from '../../arrays/list'
import { optionstype } from '../../@types/Mytypes'
import Ops from '../../components/404/Ops'
const Brandslist = () => {
    const [loding, setloding] = useState<Boolean>(false)
    const [mylist, setmylist] = useState('');

    let Dispatch = useAppDispatch()
    let Navigate = useNavigate()
    let { Brands } = useParams()
    let item = useAppSelector((e) => e.arrays.arr.find((e) => e.name === Brands))
    let arr = item?.search === false ? item.users : item?.findusers
    function getdata2() {
        let arr2: any = []
        item?.value.colors.map((e: optionstype) => {
            arr2.push(e.value)
        })
        let arr3: any = []
        item?.value.size.map((e: optionstype) => {
            arr3.push(e.value)
        })
        const data = {
            brands: [Brands],
            colors: arr2,
            sizes: arr3
        };
        axios.get(`http://localhost:3001/cards/brands/filtering/0`, { params: data }).then((response) => {
            console.log(response);
            setloding(false)
            return Dispatch(addfindusers({ name: Brands, arr: response.data }))

        }).catch(e => {
            console.log(e);

        })
    }
    function getdata() {
        axios.get(`http://localhost:3001/cards/brands/0`, { params: { brands: [Brands] } }).then((response) => {
            setloding(false)
            Dispatch(addItem({ name: Brands, arr: response.data }))
        }).catch(e => {
            console.log(e); setloding(false)
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        if (item === undefined) return Navigate('/')
        if (item.users.length === 0) {
            setloding(true)
            return getdata()
        }
    }, [Brands])

    return (
        <>
            <h2 className={css.h2}>{Brands}</h2>

            <div className={css.selestdiv} >
                <Select
                    isMulti
                    // value={value.brands}
                    closeMenuOnSelect={false}
                    // options={brands}
                    onChange={(e: any) => {
                        // Dispatch(onchange({ size: value.size, colors: value.colors, brands: e, stopfindusers: value.stopfindusers, stopusers: value.stopusers }))
                    }}
                    styles={stylelableOption}
                    onMenuOpen={() => {
                        setmylist('SizeOptions2')
                    }}

                    onMenuClose={() => {
                        setmylist('')
                    }}
                    className={mylist === 'SizeOptions2' ? `${css.selest}` : `${css.selest2}`}
                    placeholder='מותגים'
                />
                <Select
                    isMulti
                    value={item?.value.size}
                    closeMenuOnSelect={false}
                    options={[...SizeOptions, ...SizeOptions2]}
                    onChange={(e: any) => {
                        return Dispatch(onchange({ name: item?.name, slice: { size: e, colors: item?.value.colors, brands: item?.value.brands, stopfindusers: item?.value.stopfindusers, stopusers: item?.value.stopusers } }))

                    }}
                    styles={stylelableOption}
                    onMenuOpen={() => {
                        setmylist('SizeOptions')
                    }}

                    onMenuClose={() => {
                        setmylist('')
                    }}
                    className={mylist === 'SizeOptions' ? `${css.selest}` : `${css.selest2}`}
                    placeholder='מידות'
                />
                <Select
                    isMulti
                    closeMenuOnSelect={false}
                    options={colourOptions}
                    value={item?.value.colors}
                    onChange={(e: any) => {
                        return Dispatch(onchange({ name: item?.name, slice: { size: item?.value.size, colors: e, brands: item?.value.brands, stopfindusers: item?.value.stopfindusers, stopusers: item?.value.stopusers } }))

                    }}
                    styles={stylelableOption}
                    onMenuOpen={() => {
                        setmylist('SizeOptions3')
                    }}

                    onMenuClose={() => {
                        setmylist('')
                    }}
                    className={mylist === 'SizeOptions3' ? `${css.selest}` : `${css.selest2}`}
                    placeholder='צבעים'
                />
                <button onClick={() => {
                    if (item?.value.size[0] === undefined && item?.value.colors[0] === undefined && item?.value.brands[0] === undefined) {
                        return Dispatch(search({ name: item?.name }))

                    }
                    setloding(true);
                    getdata2();

                }
                }> Click </button>

            </div>


            {loding && <Spiner />}
            {loding === false ? <>
                {arr?.length === 0 ?
                    <>
                        {item?.search === false ? <Ops p='אין מוצרים' /> :
                            <><Ops p='' />
                                <button>ahmas</button>
                            </>}
                    </>
                    : <List arr={arr} />}
            </>
                : <Spiner />}
        </>
    )
}

export default Brandslist