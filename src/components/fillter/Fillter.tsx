import Select from 'react-select'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import css from './css.module.scss'
import { colourOptions, SizeOptions, SizeOptions2, stylelableOption, categorys4, categorys3, categorys2, categorys, brands, sort, limet } from '../../arrays/list'
import { addItem } from '../../features/cards/fillter';

const Fillter = (props: { name: string }) => {
    let Dispatch = useAppDispatch()
    const [mylist, setmylist] = useState('');
    const [sort1, setsort1] = useState(-1);
    const [limet1, setlimet1] = useState(10);
    const [color, setcolor] = useState<string[]>([]);
    const [sizes, setsizes] = useState<string[]>([]);
    const [category, setcategorys] = useState<string[]>([]);
    const [categorysPrimere, setcategorysPrimere] = useState<string[]>([]);
    const [brandss, setbrands] = useState<string[]>([]);

    useEffect(() => {
        Dispatch(addItem({ name: props.name, item: { colors: color, sizes: sizes, categorys2: category, categorys: categorysPrimere, brands: brandss, limet: limet1, sort: sort1 } }))
    }, [color, sizes, category, categorysPrimere, brandss, sort1, limet1]);

    return (
        <>
            {(props.name === 'Topproduct') && (<Select
                options={sort}
                onChange={(e: any) => {
                    setsort1(e.value)
                }}
                styles={stylelableOption}
                onMenuOpen={() => {
                    setmylist('1')
                }}

                onMenuClose={() => {
                    setmylist('')
                }}
                className={mylist === '1' ? `${css.selest}` : `${css.selest2}`}
                placeholder='סדר המוצרים'
            />)}
            {(props.name === 'Topproduct' || props.name === 'Favoriteproduct') && <>
                <Select
                    options={limet}
                    onChange={(e: any) => {
                        setlimet1(e.value)
                    }}
                    styles={stylelableOption}
                    onMenuOpen={() => {
                        setmylist('2')
                    }}

                    onMenuClose={() => {
                        setmylist('')
                    }}
                    className={mylist === '2' ? `${css.selest}` : `${css.selest2}`}
                    placeholder='כמות המוצרים'
                />
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
                    }}
                    styles={stylelableOption}
                    onMenuOpen={() => {
                        setmylist('3')
                    }}

                    onMenuClose={() => {
                        setmylist('')
                    }}
                    className={mylist === '3' ? `${css.selest}` : `${css.selest2}`}
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
                    closeMenuOnSelect={false}
                    options={brands}
                    onChange={(e) => {
                        let arr: string[] = []
                        e.map((e) => {
                            arr.push(e.value)
                        })
                        setbrands(arr)
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
                    closeMenuOnSelect={false}
                    options={[...SizeOptions, ...SizeOptions2]}
                    onChange={(e) => {
                        let arr: string[] = []
                        e.map((e) => {
                            arr.push(e.value)
                        })
                        setsizes(arr)
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
                    closeMenuOnSelect={false}
                    options={colourOptions}
                    onChange={(e) => {
                        let arr: string[] = []
                        e.map((e) => {
                            arr.push(e.value)
                        })
                        setcolor(arr)
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
            </>}

        </>
    )
}

export default Fillter