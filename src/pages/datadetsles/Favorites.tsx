import Select from 'react-select'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import css from './css.module.scss'
import { addarr } from '../../features/user/Performence';
import List from '../../components/List/List';
import H2 from '../../components/h2/H2';
import { colourOptions, SizeOptions, SizeOptions2, stylelableOption, categorys4, categorys3, categorys2, categorys, Url, brands } from '../../arrays/list'
import Spiner from '../../components/Spiner/Spiner';
const Favorites = () => {
    let Dispatch = useAppDispatch()
    const { accessToken } = useAppSelector((s) => s.user);
    const { data4 } = useAppSelector((s) => s.Performence);
    const [Loading, setloding] = useState(false)
    const [mylist, setmylist] = useState('');
    const [color, setcolor] = useState<string[]>([]);
    const [sizes, setsizes] = useState<string[]>([]);
    const [category, setcategorys] = useState<string[]>([]);
    const [categorysPrimere, setcategorysPrimere] = useState<string[]>([]);
    const [brandss, setbrands] = useState<string[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0)
        if (data4.length < 1) {
            setloding(true)
            favorites()
        }
    }, []);

    async function favorites() {
        axios.get(`${Url}Performence/favorites`, { params: { accessToken: accessToken, colors: color, sizes: sizes, categorys2: category, categorys: categorysPrimere, brands: brandss } }).then((response) => {
            console.log(response);
            setloding(false)
            Dispatch(addarr({ name: 'data4', arr: response.data[0].products }))
        }).catch((err: any) => {
            console.log(err);
        })
    }
    return (

        <>
            <H2 h2='Favorites' />
            <div className={css.selestdiv} >
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
                        setmylist('SizeOptions')
                    }}

                    onMenuClose={() => {
                        setmylist('')
                    }}
                    className={mylist === 'SizeOptions' ? `${css.selest}` : `${css.selest2}`}
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
                        setmylist('SizeOptions2')
                    }}

                    onMenuClose={() => {
                        setmylist('')
                    }}
                    className={mylist === 'SizeOptions2' ? `${css.selest}` : `${css.selest2}`}
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
                        setmylist('SizeOptions3')
                    }}

                    onMenuClose={() => {
                        setmylist('')
                    }}
                    className={mylist === 'SizeOptions3' ? `${css.selest}` : `${css.selest2}`}
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
                        setmylist('SizeOptions4')
                    }}

                    onMenuClose={() => {
                        setmylist('')
                    }}
                    className={mylist === 'SizeOptions4' ? `${css.selest}` : `${css.selest2}`}
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
                        setmylist('SizeOptions5')
                    }}

                    onMenuClose={() => {
                        setmylist('')
                    }}
                    className={mylist === 'SizeOptions5' ? `${css.selest}` : `${css.selest2}`}
                    placeholder='צבעים'
                />
                <button className={css.btn} onClick={() => {
                    setloding(true)
                    favorites()
                }
                }>Serahe</button>

            </div>
            {Loading === false ? <List arr={data4} /> : <Spiner />}
        </>
    )
}

export default Favorites