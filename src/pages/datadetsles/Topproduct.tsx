import Select from 'react-select'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import css from './css.module.scss'
import { Container, Row, Col } from 'react-bootstrap';
import { addarr } from '../../features/user/Performence';
import Card from '../../components/card/Card'
import H2 from '../../components/h2/H2';
import { colourOptions, SizeOptions, SizeOptions2, stylelableOption, categorys4, categorys3, categorys2, categorys, Url, brands } from '../../arrays/list'
import Spiner from '../../components/Spiner/Spiner';
const Topproduct = (Props: { str: string, end: string, limet: number, sort: number }) => {
    const [Loading, setloding] = useState(false)
    let Dispatch = useAppDispatch()
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const { accessToken } = useAppSelector((s) => s.user);
    const { data3 } = useAppSelector((s) => s.Performence);
    const [mylist, setmylist] = useState('');
    const [color, setcolor] = useState<string[]>([]);
    const [sizes, setsizes] = useState<string[]>([]);
    const [category, setcategorys] = useState<string[]>([]);
    const [categorysPrimere, setcategorysPrimere] = useState<string[]>([]);
    const [brandss, setbrands] = useState<string[]>([]);


    useEffect(() => {
        if (data3.length < 1) {
            setloding(true)
            topProduct()
        }
    }, []);

    async function topProduct() {
        axios.get(`${Url}Performence/detales`, { params: { str: Props.str, end: Props.end, accessToken: accessToken, limet: Props.limet, sort: Props.sort, colors: color, sizes: sizes, categorys2: category, categorys: categorysPrimere, brands: brandss } }).then((response) => {
            setloding(false)
            Dispatch(addarr({ name: 'data3', arr: response.data }))
        }).catch((err: any) => {
            console.log(err);
        })
    }
    return (
        <>
            <H2 h2='Top product' />
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
                    topProduct()
                }
                }>Serahe</button>

            </div>
            {Loading === true ? <Spiner /> : <Container fluid>
                <Row xs={2} sm={3} lg={4} xxl={5}>
                    {data3.map((e: any, index: number) =>
                        <Col className="mt-2 p-1" key={index}>
                            {e.shirts_product !== undefined && <Card  {...e.shirts_product} />}
                            {e.pants_product !== undefined && <Card  {...e.pants_product} />}
                            {e.shoes_product !== undefined && <Card  {...e.shoes_product} />}
                        </Col>
                    )}
                </Row>
            </Container>}
        </>
    )
}

export default Topproduct