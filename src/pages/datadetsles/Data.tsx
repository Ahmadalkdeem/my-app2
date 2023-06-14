import Select from 'react-select'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import css from './css.module.scss'
import { eachDayOfInterval, format, isValid, isBefore } from 'date-fns';
import { addarr } from '../../features/user/Performence';
import Spiner from '../../components/Spiner/Spiner';
import { stylelableOption, Url, sort, limet } from '../../arrays/list'
import Favorites from './Favorites';
import Topproduct from './Topproduct';

export const Data = () => {
    const [Loading, setloding] = useState(false)
    let Dispatch = useAppDispatch()
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const { accessToken } = useAppSelector((s) => s.user);
    const { data1, data2 } = useAppSelector((s) => s.Performence);
    const [mylist, setmylist] = useState('');
    const [startDate, setStartDate] = useState<string>(`2023-05-10`);
    const [endDate, setEndDate] = useState<string>(`2023-06-10`);
    const dates = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });
    const [sort1, setsort1] = useState(-1);
    const [limet1, setlimet1] = useState(10);
    useEffect(() => {
        window.scrollTo(0, 0)
        if (data1.length < 1) {
            setloding(true)
            getOrdersDetalese()
        }
    }, []);

    async function getOrdersDetalese() {
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
                        getOrdersDetalese()
                        setloding(true)
                    }} />
                </form>
            </div>
            <div className='d-flex flex-wrap'>
                <Select
                    options={sort}
                    onChange={(e: any) => {
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
            </div>
            <Topproduct end={endDate} limet={limet1} sort={sort1} str={startDate} />
            <Favorites />
        </>
    )
}
