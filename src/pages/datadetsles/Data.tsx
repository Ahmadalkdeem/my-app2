import Select from 'react-select'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import css from './css.module.scss'
import Card from './../../components/card/Card'
import { Container, Row, Col } from 'react-bootstrap';
import { Url, limet, sort, stylelableOption } from '../../arrays/list'
import { eachDayOfInterval, format, isValid, isBefore, isAfter } from 'date-fns';
import { addarr } from '../../features/user/Performence';
import Spiner from '../../components/Spiner/Spiner';
import List from '../../components/List/List';
import H2 from '../../components/h2/H2';
export const Data = () => {
    const [Loading, setloding] = useState(false)
    const [Loading2, setloding2] = useState(false)
    let Dispatch = useAppDispatch()
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const today = new Date();
    const { accessToken } = useAppSelector((s) => s.user);
    const { data1, data2, data3, data4 } = useAppSelector((s) => s.Performence);

    const [mylist, setmylist] = useState('');
    const [startDate, setStartDate] = useState<string>(`${thirtyDaysAgo.getFullYear().toString()}-${(thirtyDaysAgo.getMonth() + 1).toString().padStart(2, '0')}-${thirtyDaysAgo.getDate().toString().padStart(2, '0')}`);
    const [endDate, setEndDate] = useState<string>(`${today.getFullYear().toString()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`);
    const dates = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });
    const [sort1, setsort1] = useState('-1');
    const [limet1, setlimet1] = useState('10');
    useEffect(() => {
        window.scrollTo(0, 0)
        if (data1.length < 1) {
            setloding(true)
            setloding2(true)
            getdata()
            topproduct()
            favorites()
        }
    }, []);

    function getdata() {
        axios.get(`${Url}Performence/getorders/detales`, { params: { str: startDate, end: endDate, accessToken: accessToken } }).then((response) => {
            setloding(false)
            let arr: any = []
            dates.map((date) => {


                let item = response.data.find((e: any) => e._id.date === format(date, 'dd-MM-yyyy'))
                if (item === undefined) {
                    arr.push({ _id: { date: format(date, 'dd-MM-yyyy') }, totalPrice: 0, count: 0, avg: 0 })
                } else {
                    arr.push(item)
                }
            })
            Dispatch(addarr({ name: 'data1', arr: arr }))
        }).catch((err: any) => {
            setloding(false)

            console.log(err);
            console.log(err.response.data.error);
        })

        axios.get(`${Url}Performence/getorders/count`, { params: { str: startDate, end: endDate, accessToken: accessToken } }).then((response) => {
            setloding(false)
            if (response.data.result[0] !== undefined) {
                Dispatch(addarr({ name: 'data2', arr: response.data.result[0] }))
            }

        }).catch((err: any) => {
            setloding(false)

            console.log(err);
        })
    }
    function topproduct() {
        axios.get(`${Url}Performence/detales`, { params: { str: startDate, end: endDate, accessToken: accessToken, limet: limet1, sort: sort1 } }).then((response) => {
            setloding2(false)
            Dispatch(addarr({ name: 'data3', arr: response.data }))
        }).catch((err: any) => {
            setloding2(false)
            console.log(err);
        })
    }
    function favorites() {
        axios.get(`${Url}Performence/favorites`, { params: { str: startDate, end: endDate, accessToken: accessToken, limet: limet1, sort: sort1 } }).then((response) => {
            Dispatch(addarr({ name: 'data4', arr: response.data[0].products }))
        }).catch((err: any) => {
            setloding2(false)
            console.log(err);
        })
    }

    return (
        <>
            {Loading === true ? <Spiner /> : <div className='d-flex justify-content-center align-items-center flex-wrap overflow-auto'>
                <div className='m-3'>
                    <h5 className={css.h1}> מחיר הזמנות : {data2.total}</h5>
                    <LineChart width={400} height={250} data={data1}>
                        <XAxis dataKey="_id.date" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="totalPrice" stroke="#000" />
                        <Tooltip />
                    </LineChart>
                </div>
                <div>
                    <h5 className={css.h1}>ממוצע מחיר ההזמנות : {data2.avg}</h5>

                    <LineChart width={400} height={250} data={data1}>
                        <XAxis dataKey="_id.date" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="avg" stroke="#000" />
                        <Tooltip />
                    </LineChart>
                </div>
                <div>
                    <h5 className={css.h1}>מספר ההזמנות : {data2.count}</h5>
                    <LineChart width={400} height={250} data={data1}>
                        <XAxis dataKey="_id.date" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="count" stroke="#000" />
                        <Tooltip />
                    </LineChart>
                </div>
            </div>}
            <div>
                <form >
                    <label>
                        Start Date:
                        <input value={startDate} type="date" onChange={(e) => {
                            let date = new Date(e.target.value)
                            if (isValid(date) && isBefore(date, new Date(endDate))) {
                                setStartDate(e.target.value)
                            }
                        }} />
                    </label>
                    <label>
                        End Date:
                        <input type="date" value={endDate} onChange={(e) => {
                            let date = new Date(e.target.value)
                            if (isValid(date) && !isBefore(date, new Date(startDate))) {
                                setEndDate(e.target.value)
                            }
                        }} />
                    </label>
                    <input type="button" value="click" onClick={() => {
                        getdata()
                        setloding(true)
                    }} />
                </form>
            </div>
            <div className='d-flex flex-wrap'>
                <Select
                    options={sort}
                    onChange={(e: any) => {
                        console.log(e.value);

                        setsort1(e.value)
                    }}
                    styles={stylelableOption}
                    onMenuOpen={() => {
                        setmylist('SizeOptions2')
                    }}

                    onMenuClose={() => {
                        setmylist('')
                    }}
                    className={mylist === 'SizeOptions2' ? `${css.selest}` : `${css.selest2}`}
                    placeholder='סדר המוצרים'
                />
                <Select
                    options={limet}
                    onChange={(e: any) => {
                        console.log(e.value);

                        setlimet1(e.value)
                    }}
                    styles={stylelableOption}
                    onMenuOpen={() => {
                        setmylist('SizeOptions')
                    }}

                    onMenuClose={() => {
                        setmylist('')
                    }}
                    className={mylist === 'SizeOptions' ? `${css.selest}` : `${css.selest2}`}
                    placeholder='כמות המוצרים'
                />
                <input onClick={() => {
                    setloding2(true)
                    topproduct()
                }} className='btn btn-primary' type="button" value="click" />
            </div>
            {Loading2 ? <Spiner /> :
                <>

                    <Container fluid>
                        <Row xs={2} sm={3} lg={4} xxl={5}>

                            {data3.map((e: any, index: number) =>
                                <Col key={index} className="mt-2 p-1">
                                    {e.shoes_product !== undefined && <Card {...e.shoes_product} key={index} />}
                                    {e.pants_product !== undefined && <Card {...e.pants_product} key={index} />}
                                    {e.shirts_product !== undefined && <Card {...e.shirts_product} key={index} />}
                                </Col>
                            )}

                        </Row>
                    </Container></>}
            <H2 h2='Favorites' />
            <List arr={data4} />
        </>
    )
}
