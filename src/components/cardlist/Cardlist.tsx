import Select from 'react-select'
import { useState, useEffect } from 'react'
import MyCard from '../card/Card'
import css from './css.module.scss'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap';
import { stylelableOption, brands, colourOptions, SizeOptions } from '../../arrays/list'
import { optionstype } from '../../@types/Mytypes'
import Spiner from '../Spiner/Spiner'
function Cardlist(props: { h1: string, users: [] }) {
    const [selectbrands, setselectbrands] = useState<any>([])
    const [selectcolors, setselectcolors] = useState<any>([])
    const [selectsizes, setselectsizes] = useState<any>([])
    const [arr, setarr] = useState<any>(props.users)
    const [loding, setloding] = useState<any>(true)

    const [opsions, setopsions] = useState<any>([])
    const [mylist, setmylist] = useState('');
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const afterSlash = parts[parts.length - 1];
    console.log(afterSlash);

    const data = {
        brands: selectbrands,
        colors: selectcolors,
        sizes: selectsizes
    };

    let category = ''
    if (afterSlash === 'Shirts') { category = 'Shirtsproduct' }
    if (afterSlash === 'pants') { category = 'pantsproduct' }
    if (afterSlash === 'shoes') { category = 'shoesproduct' }
    function getdata() {
        axios.get(`http://localhost:3001/filtering/${category}/0`, { params: data }).then((response) => {
            console.log(response.data);
            setloding(true);
            setarr(response.data)
        }).catch(e => {
            console.log(e);
        })
    }
    useEffect(() => {
        if (afterSlash === 'pants') {
            // setopsions(SizeOptions2)
            setopsions(SizeOptions)
        }
        if (afterSlash === 'Shirts') {
            setopsions(SizeOptions)
        }
        if (afterSlash === 'shoes') {
            // setopsions(SizeOptions2)
            setopsions(SizeOptions)
        }
    }, [afterSlash])

    return (
        <>
            <h1 className={css.h1}>{props.h1}</h1>
            <div className={css.selestdiv}>

                {/* <Select
                    id='SizeOptions'
                    options={categorys}
                    // onChange={(e: any) => {
                    //     console.log(e);
                    //     setmylist('')

                    //     setsize(e.value)
                    // }}
                    styles={stylelableOption}
                    onMenuOpen={() => {
                        setmylist('SizeOptions')
                    }}
                    onMenuClose={() => {
                        setmylist('')
                    }}
                    className={mylist === 'SizeOptions' ? `${css.selest}` : `${css.selest2}`}
                    placeholder='categorys'
                /> */}
                <Select
                    id='SizeOptions2'
                    isMulti
                    closeMenuOnSelect={false}
                    options={brands}
                    onChange={(e: any) => {
                        let arr: any = []
                        e.map((e: optionstype) => {
                            arr.push(e.value)
                        })
                        setselectbrands(arr)

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
                    id='SizeOptions2'
                    isMulti
                    closeMenuOnSelect={false}
                    options={opsions}
                    onChange={(e: any) => {
                        let arr: any = []
                        e.map((e: optionstype) => {
                            arr.push(e.value)
                        })
                        setselectsizes(arr)

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
                    id='SizeOptions2'
                    isMulti
                    closeMenuOnSelect={false}
                    options={colourOptions}
                    onChange={(e: any) => {
                        let arr: any = []
                        e.map((e: optionstype) => {
                            arr.push(e.value)
                        })
                        setselectcolors(arr)

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
                    setloding(false);
                    getdata();
                }}>ahmad</button>
            </div>
            {loding === true ? <Container className={`Container ${css.Container}`} fluid>
                <Row xs={2} sm={3} lg={4} xxl={5}>
                    {arr.map(((product: any, i: number) => (
                        <Col key={i} className="mt-2 p-1">
                            <MyCard key={i}
                                {...product} />
                        </Col>)))}
                </Row>
            </Container> : <Spiner />}
            {/* <Container className={`Container ${css.Container}`} fluid>
                <Row xs={2} sm={3} lg={4} xxl={5}>

                    {arr.map(((product: any, i: number) => (
                        <Col key={i} className="mt-2 p-1">
                            <MyCard key={i}
                                {...product} />
                        </Col>)))}
                </Row>
            </Container> */}
        </>
    )
}

export default Cardlist