import Select from 'react-select'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import css from './css.module.scss'
import Card from './../../components/card/Card'
import { Container, Row, Col } from 'react-bootstrap';
import { limet, sort, stylelableOption } from '../../arrays/list'
//name
import { addarr } from '../../features/user/Performence';
export const Data = () => {
    let Dispatch = useAppDispatch()
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const today = new Date();
    const { accessToken } = useAppSelector((s) => s.user);
    const { data1, data2, data3 } = useAppSelector((s) => s.Performence);
    const [mylist, setmylist] = useState('');
    const [startDate, setStartDate] = useState<any>(`${thirtyDaysAgo.getFullYear().toString()}-${(thirtyDaysAgo.getMonth() + 1).toString().padStart(2, '0')}-${thirtyDaysAgo.getDate().toString().padStart(2, '0')}`);
    const [endDate, setEndDate] = useState<any>(`${today.getFullYear().toString()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`);
    console.log(startDate, endDate);
    const [sort1, setsort1] = useState('-1');
    const [limet1, setlimet1] = useState('10');


    useEffect(() => {
        window.scrollTo(0, 0)
        if (data1.length < 1) {
            getdata()
            topproduct()
        }
    }, []);

    function getdata() {
        axios.get(`http://localhost:3001/Performence/getorders/detales/${accessToken}/${startDate}/${endDate}`, {
        }).then((response) => {
            Dispatch(addarr({ name: 'data1', arr: response.data }))
        }).catch((err: any) => {
            console.log(err);
            console.log(err.response.data.error);
        })

        axios.get(`http://localhost:3001/Performence/getorders/count/${accessToken}/${startDate}/${endDate}`, {
        }).then((response) => {
            if (response.data.result[0] !== undefined) {
                Dispatch(addarr({ name: 'data2', arr: response.data.result[0] }))
            }

        }).catch((err: any) => {
            console.log(err);
        })
    }
    function topproduct() {
        axios.get(`http://localhost:3001/Performence/detales/${accessToken}/${limet1}/${sort1}`, {
        }).then((response) => {
            Dispatch(addarr({ name: 'data3', arr: response.data }))
        }).catch((err: any) => {
            console.log(err);
        })
    }

    return (
        <div className='d-flex justify-content-center align-items-center flex-wrap overflow-auto'>
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
            <div>
                {/* <input value={totle} onChange={(e: any) => {
                    if (e.target.value > 0 && 1000 > e.target.value) {
                        settotle(e.target.value)
                    }
                }} min='1' max='1000' type="number" /> */}
                <form >
                    <label>
                        Start Date:
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </label>
                    <label>
                        End Date:
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </label>
                    <input type="button" value="click" onClick={getdata} />
                </form>
                {/* <div>totle2:{totle2.total}</div> */}
                {/* <div>
                    <h1>Today's Date: {today.toDateString()}</h1>
                    <h1>Date 30 Days Ago: {thirtyDaysAgo.toDateString()}</h1>
                </div> */}
                <div className='d-flex flex-wrap'>
                    <Select
                        id='SizeOptions2'
                        // closeMenuOnSelect={false}
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
                        placeholder='מותגים'
                    />
                    <Select
                        id='SizeOptions2'
                        // closeMenuOnSelect={false}
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
                        placeholder='מותגים'
                    />
                    <input onClick={topproduct} className='btn btn-primary' type="button" value="click" />
                </div>
                <Container fluid>
                    <Row xs={2} sm={3} lg={4} xxl={5}>

                        {data3.map((e: any, index: number) =>
                            <>
                                <Col key={index} className="mt-2 p-1">
                                    {e.shoes_product === undefined ? '' : <Card {...e.shoes_product} key={index} />}
                                    {e.pants_product === undefined ? '' : <Card {...e.pants_product} key={index} />}
                                    {e.shirts_product === undefined ? '' : <Card {...e.shirts_product} key={index} />}
                                </Col>
                            </>
                        )}

                    </Row>
                </Container>


            </div>
        </div>
    )
}
