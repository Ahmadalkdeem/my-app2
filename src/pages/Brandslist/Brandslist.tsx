import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { addItems, search, onchange, addfindItems, addfindItems2 } from '../../features/cards/arrays'
import axios from 'axios'
import css from './css.module.scss'
import List from '../../components/List/List'
import Spiner from '../../components/Spiner/Spiner'
import { Url } from '../../arrays/list'
import { optionstype } from '../../@types/Mytypes'
import Ops from '../../components/404/Ops'
import H2 from '../../components/h2/H2'
import Fillter from './Fillter'


const Brandslist = () => {
    const [lodingg, setlodingg] = useState<Boolean>(false)
    const [lodinggfind, setlodinggfind] = useState<Boolean>(false)
    let Dispatch = useAppDispatch()
    let Navigate = useNavigate()
    let { Brands } = useParams()
    let item = useAppSelector((e) => e.arrays.arr.find((e) => e.name === Brands))
    let arr: any = item?.search === false ? item.users : item?.findusers

    function getdata() {
        axios.get(`${Url}cards/brands/filtering`, {
            params: {
                brands: [Brands], skip: item?.users.length
            }
        }).then((response) => {

            setlodingg(false)
            setlodinggfind(false)
            Dispatch(addItems({ name: Brands, arr: response.data }))
            if (response.data[0] === undefined) {
                Dispatch(onchange({ name: item?.name, slice: { size: item?.value.size, colors: item?.value.colors, brands: item?.value.brands, stopfindusers: item?.value.stopfindusers, stopusers: true, categorys: item?.value.categorys, categorys2: item?.value.categorys2 } }))
            }
        }).catch(e => {
            console.log(e);
            setlodingg(false)
        })
    }

    function getFinddData() {
        setlodingg(true)
        let arr2: any = []
        item?.value.colors.map((e: optionstype) => {
            arr2.push(e.value)
        })
        let arr3: any = []
        item?.value.size.map((e: optionstype) => {
            arr3.push(e.value)
        })
        let arr4: any = []
        item?.value.categorys.map((e: optionstype) => {
            arr4.push(e.value)
        })
        let arr5: any = []
        item?.value.categorys2.map((e: optionstype) => {
            arr5.push(e.value)
        })
        const data = {
            brands: [Brands],
            colors: arr2,
            sizes: arr3,
            categorys: arr4,
            categorys2: arr5,
            skip: 0
        };
        axios.get(`${Url}cards/brands/filtering`, { params: data }).then((response) => {
            setlodingg(false)
            setlodinggfind(false)
            Dispatch(addfindItems({ name: Brands, arr: response.data }))
            if (response.data[0] === undefined) {
                Dispatch(onchange({ name: item?.name, slice: { size: item?.value.size, colors: item?.value.colors, brands: item?.value.brands, stopfindusers: true, stopusers: item?.value.stopusers, categorys: item?.value.categorys, categorys2: item?.value.categorys2 } }))
            }

        }).catch(e => {
            console.log(e);

        })
    }
    function moreFindData() {
        let arr2: any = []
        item?.value.colors.map((e: optionstype) => {
            arr2.push(e.value)
        })
        let arr3: any = []
        item?.value.size.map((e: optionstype) => {
            arr3.push(e.value)
        })
        let arr4: any = []
        item?.value.categorys.map((e: optionstype) => {
            arr4.push(e.value)
        })
        let arr5: any = []
        item?.value.categorys2.map((e: optionstype) => {
            arr5.push(e.value)
        })
        const data = {
            brands: [Brands],
            colors: arr2,
            sizes: arr3,
            categorys: arr4,
            categorys2: arr5,
            skip: item?.findusers.length
        };
        axios.get(`${Url}cards/brands/filtering`, { params: data }).then((response) => {
            setlodinggfind(false)
            Dispatch(addfindItems2({ name: Brands, arr: response.data }))
            if (response.data[0] === undefined) {
                Dispatch(onchange({ name: item?.name, slice: { size: item?.value.size, colors: item?.value.colors, brands: item?.value.brands, stopfindusers: true, stopusers: item?.value.stopusers, categorys: item?.value.categorys, categorys2: item?.value.categorys2 } }))
            }

        }).catch(e => {
            console.log(e);

        })
    }

    window.onscroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.clientHeight;
        const scrollPercentage = (scrollPosition / (bodyHeight - windowHeight)) * 100;

        if (scrollPercentage > 65 && scrollPercentage <= 100) {
            if (lodinggfind === false && lodingg === false) {
                setlodinggfind(true)
                if (item?.search === false) { if (item.value.stopusers === false) { getdata() } }
                else { if (item?.value.stopfindusers === false) { moreFindData() } }
            }
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        if (item === undefined) return Navigate('/')
        if (item.users.length === 0) {
            setlodingg(true)
            return getdata()
        }
    }, [Brands])

    return (
        <>
            <H2 h2={`${Brands}`} />

            <div className={css.selestdiv} >
                <Fillter />
                <button className={css.btn} onClick={() => {
                    if (item?.value.size[0] === undefined && item?.value.categorys[0] === undefined && item?.value.categorys2[0] === undefined && item?.value.colors[0] === undefined) {
                        return Dispatch(search({ name: item?.name }))
                    }
                    setlodingg(true);
                    getFinddData();
                }
                }>Serahe</button>

            </div>


            {lodingg && <Spiner />}
            {lodingg === false && <>
                {arr?.length === 0 ?
                    <>
                        {item?.search === false ? <Ops p='אין מוצרים' /> :
                            <><Ops p='' />
                                <button>ahmas</button>
                            </>}
                    </>
                    : <List arr={arr} />}
            </>
            }
        </>
    )
}

export default Brandslist