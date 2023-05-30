import { useAppSelector } from '../../app/hooks'
import Spiner from '../../components/Spiner/Spiner';
import { Helmet } from "react-helmet";
import Select from 'react-select'
import { useState, useEffect } from 'react'
import css from './css.module.scss'
import axios from 'axios'
import { stylelableOption, brands, colourOptions, SizeOptions } from '../../arrays/list'
import { useAppDispatch } from '../../app/hooks'
import { addfindusers, search as search1, onchange, addItem } from '../../features/cards/cardshose'
import { optionstype } from '../../@types/Mytypes'
import List from '../../components/List/List';
function Shose() {
    const { loading, users, error, findusers, search, value } = useAppSelector((s) => s.cardshose);
    const Dispatch = useAppDispatch();
    const [loding, setloding] = useState<boolean>(true)
    const [data, setdata] = useState<boolean>(true)
    const [mylist, setmylist] = useState('');
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function getdata() {
        if (data === true) {
            setdata(false)
            let arr: any = []
            value.brands.map((e: optionstype) => {
                arr.push(e.value)
            })
            let arr2: any = []
            value.colors.map((e: optionstype) => {
                arr2.push(e.value)
            })
            let arr3: any = []
            value.size.map((e: optionstype) => {
                arr3.push(e.value)
            })
            const data = {
                brands: arr,
                colors: arr2,
                sizes: arr3
            };
            axios.get(`http://localhost:3001/cards/filtering/shoesproduct/0`, { params: data }).then((response) => {
                setloding(true);
                setdata(true)
                return Dispatch(addfindusers(response.data))

            }).catch(e => {
                console.log(e);
                setdata(true)

            })
        }
    }
    function getdata3() {
        console.log('ahmad');

        if (data === true) {
            setdata(false)
            let arr: any = []
            value.brands.map((e: optionstype) => {
                arr.push(e.value)
            })
            let arr2: any = []
            value.colors.map((e: optionstype) => {
                arr2.push(e.value)
            })
            let arr3: any = []
            value.size.map((e: optionstype) => {
                arr3.push(e.value)
            })
            const data = {
                brands: arr,
                colors: arr2,
                sizes: arr3
            };
            axios.get(`http://localhost:3001/cards/filtering/shoesproduct/${findusers.length}`, { params: data }).then((response) => {
                setdata(true)
                Dispatch(addItem(response.data))
                if (response.data.length === 0) {
                    Dispatch(onchange({ size: value.size, colors: value.colors, brands: value.brands, stopfindusers: true, stopusers: value.stopusers }))
                }

            }).catch(e => {
                console.log(e);
                setdata(true)

            })
        }
    }
    function getdata2() {
        if (data === true) {

            setdata(false)
            axios.get(`http://localhost:3001/cards/filtering/shoesproduct/${users.length}`, {}).then((response) => {
                setdata(true)
                setloding(true);
                Dispatch(addItem(response.data))
                if (response.data.length === 0) {
                    Dispatch(onchange({ size: value.size, colors: value.colors, brands: value.brands, stopfindusers: value.stopfindusers, stopusers: true }))
                }
            }).catch((e) => {
                console.log(e);
                setdata(true)

            })
        }
    }

    window.onscroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.clientHeight;
        const scrollPercentage = (scrollPosition / (bodyHeight - windowHeight)) * 100;

        if (scrollPercentage > 65 && scrollPercentage <= 100) {
            if (search === false) { if (value.stopusers === false) { getdata2() } }
            else { if (value.stopfindusers === false) { getdata3() } }
        }
    }



    return (
        <>
            <Helmet>
                <title>מבחר נעליים לגברים | חנות האופנה המובילה באינטרנט</title>
                <meta name="description" content="גלו את המבחר המדהים שלנו של נעליים לגברים , כולל סניקרס, נעלי עקב, נעלי ספורט ועוד. הזמינו עכשיו ותהיו בטופ!" />
                <meta name="keywords" content="נעליים, סניקרס, עקב, ספורט, אופנה, חנות, אינטרנט, קניות" />
            </Helmet>

            {loading && <Spiner />}
            {error && <div>{error}</div>}

            {users.length > 0 &&
                <>
                    <h1 className={css.h1}>חולצות גבריים</h1>
                    <div className={css.selestdiv}>
                        <Select
                            isMulti
                            value={value.brands}
                            closeMenuOnSelect={false}
                            options={brands}
                            onChange={(e: any) => {
                                Dispatch(onchange({ size: value.size, colors: value.colors, brands: e, stopfindusers: value.stopfindusers, stopusers: value.stopusers }))
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
                            value={value.size}
                            closeMenuOnSelect={false}
                            options={SizeOptions}
                            onChange={(e: any) => {
                                Dispatch(onchange({ size: e, colors: value.colors, brands: value.brands, stopfindusers: value.stopfindusers, stopusers: value.stopusers }))
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
                            value={value.colors}
                            onChange={(e: any) => {
                                return Dispatch(onchange({ size: value.size, colors: e, brands: value.brands, stopfindusers: value.stopfindusers, stopusers: value.stopusers }))

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
                            if (value.size[0] === undefined && value.colors[0] === undefined && value.brands[0] === undefined) {
                                return Dispatch(search1())

                            }
                            setloding(false);
                            getdata();

                        }}>Click</button>

                    </div>
                    {loding ? <List arr={search === false ? users : findusers} /> : <Spiner />}
                </>
            }

        </>
    )
}

export default Shose

