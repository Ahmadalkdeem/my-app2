import { useAppSelector } from '../../app/hooks'
import Spiner from '../../components/Spiner/Spiner';
import { Helmet } from "react-helmet";
import Select from 'react-select'
import { useState, useEffect } from 'react'
import css from './css.module.scss'
import axios from 'axios'
import { stylelableOption, brands, colourOptions, SizeOptions, Url } from '../../arrays/list'
import { useAppDispatch } from '../../app/hooks'
import { addfindusers, search as search1, onchange, addItem } from '../../features/cards/cardshirts'
import { optionstype } from '../../@types/Mytypes'
import List from '../../components/List/List';
import Fillter from './Fillter';
function Pants() {
    const { loading, users, error, findusers, search, value } = useAppSelector((s) => s.cardshirts);
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
            let arr4: any = []
            value.catgre.map((e: optionstype) => {
                arr4.push(e.value)
            })
            const data = {
                brands: arr,
                colors: arr2,
                sizes: arr3,
                categorys2: arr4,
                skip: 0
            };
            axios.get(`${Url}cards/filtering/Shirtsproduct`, { params: data }).then((response) => {
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
            let arr4: any = []
            value.catgre.map((e: optionstype) => {
                arr4.push(e.value)
            })
            const data = {
                brands: arr,
                colors: arr2,
                sizes: arr3,
                categorys2: arr4,
                skip: 0
            };
            axios.get(`${Url}cards/filtering/Shirtsproduct`, { params: data }).then((response) => {
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
            axios.get(`${Url}cards/filtering/Shirtsproduct`, { params: { skip: users.length } }).then((response) => {
                setdata(true)
                setloding(true);
                Dispatch(addItem(response.data))
                if (response.data.length === 0) {
                    Dispatch(onchange({ size: value.size, colors: value.colors, brands: value.brands, stopfindusers: value.stopfindusers, stopusers: true }))
                }

            }).catch(e => {
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
                <title>קנו חולצות לגברים ונשים בחנות האופנה המובילה באינטרנט</title>
                <meta name="description" content="גלו את המגוון הרחב שלנו של חולצות לגברים ונשים, כולל חולצות טי, חולצות פולו, חולצות חורף ועוד. הזמינו עכשיו ותהיו בטופ!" />
                <meta name="keywords" content="חולצות, טי, פולו, חורף, אופנה, חנות, אינטרנט," />
            </Helmet>
            {loading && <Spiner />}
            {error && <div>{error}</div>}

            {users.length > 0 &&
                <>
                    <h1 className={css.h1}>חולצות גבריים</h1>
                    <div className={css.selestdiv}>
                        <Fillter name='shirts' value={value} />
                        <button className={css.btn} onClick={() => {
                            if (value.size[0] === undefined && value.catgre[0] === undefined && value.colors[0] === undefined && value.brands[0] === undefined) {
                                return Dispatch(search1())

                            }
                            setloding(false);
                            console.log(value);

                            getdata();

                        }}>Click</button>

                    </div>
                    {loding ? <List arr={search === false ? users : findusers} /> : <Spiner />}
                </>
            }

        </>
    )
}

export default Pants