import Select from 'react-select'
import { useState } from 'react'
import { useAppDispatch } from '../../app/hooks';
import css from './css.module.scss'
import { colourOptions, SizeOptions, SizeOptions2, stylelableOption, categorys4, categorys3, categorys2, categorys, brands } from '../../arrays/list'
import { addItem } from '../../features/cards/fillter';
const Fillter = (props: { name: string }) => {
    let Dispatch = useAppDispatch()
    const [mylist, setmylist] = useState('');
    const [color, setcolor] = useState<string[]>([]);
    const [sizes, setsizes] = useState<string[]>([]);
    const [category, setcategorys] = useState<string[]>([]);
    const [categorysPrimere, setcategorysPrimere] = useState<string[]>([]);
    const [brandss, setbrands] = useState<string[]>([]);


    return (

        <>
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={categorys}
                onChange={(e) => {
                    let arr: string[] = []
                    e.map((e) => {
                        arr.push(e.value)
                    })
                    setcategorysPrimere(arr)
                    Dispatch(addItem({ name: props.name, item: { colors: color, sizes: sizes, categorys2: category, categorys: arr, brands: brandss } }))
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
                closeMenuOnSelect={false}
                options={[...categorys4, ...categorys3, ...categorys2]}
                onChange={(e) => {
                    let arr: string[] = []
                    e.map((e) => {
                        arr.push(e.value)
                    })
                    setcategorys(arr)
                    Dispatch(addItem({ name: props.name, item: { colors: color, sizes: sizes, categorys2: arr, categorys: categorysPrimere, brands: brandss } }))
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
                closeMenuOnSelect={false}
                options={brands}
                onChange={(e) => {
                    let arr: string[] = []
                    e.map((e) => {
                        arr.push(e.value)
                    })
                    setbrands(arr)
                    Dispatch(addItem({ name: props.name, item: { colors: color, sizes: sizes, categorys2: category, categorys: categorysPrimere, brands: arr } }))
                }}
                styles={stylelableOption}
                onMenuOpen={() => {
                    setmylist('3')
                }}

                onMenuClose={() => {
                    setmylist('')
                }}
                className={mylist === '3' ? `${css.selest}` : `${css.selest2}`}
                placeholder='brands'
            />
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={[...SizeOptions, ...SizeOptions2]}
                onChange={(e) => {
                    let arr: string[] = []
                    e.map((e) => {
                        arr.push(e.value)
                    })
                    setsizes(arr)
                    Dispatch(addItem({ name: props.name, item: { colors: color, sizes: arr, categorys2: category, categorys: categorysPrimere, brands: brandss } }))
                }}
                styles={stylelableOption}
                onMenuOpen={() => {
                    setmylist('4')
                }}

                onMenuClose={() => {
                    setmylist('')
                }}
                className={mylist === '4' ? `${css.selest}` : `${css.selest2}`}
                placeholder='מידות'
            />
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={colourOptions}
                onChange={(e) => {
                    let arr: string[] = []
                    e.map((e) => {
                        arr.push(e.value)
                    })
                    setcolor(arr)
                    Dispatch(addItem({ name: props.name, item: { colors: arr, sizes: sizes, categorys2: category, categorys: categorysPrimere, brands: brandss } }))
                }}
                styles={stylelableOption}
                onMenuOpen={() => {
                    setmylist('5')
                }}

                onMenuClose={() => {
                    setmylist('')
                }}
                className={mylist === '5' ? `${css.selest}` : `${css.selest2}`}
                placeholder='צבעים'
            />
        </>
    )
}

export default Fillter