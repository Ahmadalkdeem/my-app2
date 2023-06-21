import { useState, useEffect } from 'react'
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useAppDispatch } from '../../app/hooks'
import Select from 'react-select'
import css from './css.module.scss'
import { colourOptions, SizeOptions, SizeOptions2, stylelableOption, categorys4, categorys3, categorys2, categorys, brands, sort, limet } from '../../arrays/list'
import { optionstype } from '../../@types/Mytypes'
import { onchange } from '../../features/cards/cardPants'
import { onchange as onchange2 } from '../../features/cards/cardshirts'
import { onchange as onchange3 } from '../../features/cards/cardshose'

const Fillter = (props: { name: string, value: { size: optionstype[], colors: optionstype[], brands: optionstype[], catgre: optionstype[], stopusers: boolean, stopfindusers: boolean } }) => {
    let Dispatch = useAppDispatch()
    const [mylist, setmylist] = useState('');
    const [color, setcolor] = useState<optionstype[]>([]);
    const [sizes, setsizes] = useState<optionstype[]>([]);
    const [category, setcategorys] = useState<optionstype[]>([]);
    const [brandss, setbrands] = useState<optionstype[]>([]);

    useEffect(() => {
        setcolor(props.value.colors)
        setsizes(props.value.size)
        setcategorys(props.value.catgre)
        setbrands(props.value.brands)
    }, [props.value]);
    useEffect(() => {
        if (props.name === 'shirts') { Dispatch(onchange2({ size: sizes, catgre: category, colors: color, brands: brandss, stopfindusers: props.value.stopfindusers, stopusers: props.value.stopusers })) }
        if (props.name === 'shose') { Dispatch(onchange3({ size: sizes, catgre: category, colors: color, brands: brandss, stopfindusers: props.value.stopfindusers, stopusers: props.value.stopusers })) }
        if (props.name === 'pants') { Dispatch(onchange({ size: sizes, catgre: category, colors: color, brands: brandss, stopfindusers: props.value.stopfindusers, stopusers: props.value.stopusers })) }

    }, [color, sizes, category, brandss]);
    return (
        <>
            <Select
                isMulti
                value={category}
                closeMenuOnSelect={false}
                options={[...categorys4, ...categorys3, ...categorys2]}
                onChange={(e: any) => {
                    setcategorys(e)
                }}
                styles={stylelableOption}
                onMenuOpen={() => {
                    setmylist('4')
                }}

                onMenuClose={() => {
                    setmylist('')
                }}
                className={mylist === '4' ? `${css.selest}` : `${css.selest2}`}
                placeholder='כתוגרי משנית'
            />
            <Select
                isMulti
                value={brandss}
                closeMenuOnSelect={false}
                options={brands}
                onChange={(e: any) => {
                    setbrands(e)
                }}
                styles={stylelableOption}
                onMenuOpen={() => {
                    setmylist('5')
                }}

                onMenuClose={() => {
                    setmylist('')
                }}
                className={mylist === '5' ? `${css.selest}` : `${css.selest2}`}
                placeholder='brands'
            />
            <Select
                isMulti
                value={sizes}
                closeMenuOnSelect={false}
                options={[...SizeOptions, ...SizeOptions2]}
                onChange={(e: any) => {
                    setsizes(e)
                }}
                styles={stylelableOption}
                onMenuOpen={() => {
                    setmylist('6')
                }}

                onMenuClose={() => {
                    setmylist('')
                }}
                className={mylist === '6' ? `${css.selest}` : `${css.selest2}`}
                placeholder='מידות'
            />
            <Select
                isMulti
                value={color}
                closeMenuOnSelect={false}
                options={colourOptions}
                onChange={(e: any) => {
                    setcolor(e)
                }}
                styles={stylelableOption}
                onMenuOpen={() => {
                    setmylist('7')
                }}

                onMenuClose={() => {
                    setmylist('')
                }}
                className={mylist === '7' ? `${css.selest}` : `${css.selest2}`}
                placeholder='צבעים'
            />


        </>)
}

export default Fillter