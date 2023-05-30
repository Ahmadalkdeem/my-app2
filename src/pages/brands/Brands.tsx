import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { addItem, delteItem, search, onchange, addfindusers } from '../../features/cards/arrays'
import axios from 'axios'
import List from '../../components/List/List'
import { item, Cardtype } from '../../@types/Mytypes'
import Spiner from '../../components/Spiner/Spiner'
const Brands = () => {
    const [loding, setloding] = useState<Boolean>(false)
    let Dispatch = useAppDispatch()
    let Navigate = useNavigate()
    let { Brands } = useParams()
    function getdata() {
        axios.get(`http://localhost:3001/cards/brands/0`, { params: { brands: [Brands] } }).then((response) => {
            setloding(false)
            Dispatch(addItem({ name: Brands, arr: response.data }))
        }).catch(e => {
            console.log(e); setloding(false)
        })
    }
    let item: any = useAppSelector((e) => e.arrays.arr.find((e) => e.name === Brands))
    useEffect(() => {
        if (item === undefined) return Navigate('/')
        if (item.users.length === 0) {
            setloding(true)
            return getdata()
        }
    }, [Brands])

    return (
        <>
            <div>{Brands}</div>
            {loding && <Spiner />}
            <List arr={item.users} />
        </>
    )
}

export default Brands