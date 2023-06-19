import { useEffect, useState } from 'react'
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import css from './css.module.scss'
import { Container, Row, Col } from 'react-bootstrap';
import { addarr } from '../../features/user/Performence';
import Card from '../../components/card/Card'
import H2 from '../../components/h2/H2';
import { Url } from '../../arrays/list'
import Spiner from '../../components/Spiner/Spiner';
import Fillter from '../../components/fillter/Fillter';
const Topproduct = (Props: { str: string, end: string }) => {
    const [Loading, setloding] = useState(false)
    let Dispatch = useAppDispatch()
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const { accessToken } = useAppSelector((s) => s.user);
    const { data3 } = useAppSelector((s) => s.Performence);
    const { Topproduct } = useAppSelector((s) => s.fillter);
    console.log(Topproduct);
    console.log(data3);

    useEffect(() => {
        if (data3.length < 1) {
            setloding(true)
            topProduct()
        }
    }, []);
    console.log({ str: Props.str, end: Props.end, accessToken: accessToken, ...Topproduct });
    async function topProduct() {
        axios.get(`${Url}Performence/detales`, { params: { str: Props.str, end: Props.end, accessToken: accessToken, ...Topproduct } }).then((response) => {
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
                <Fillter name='Topproduct' />
                <button className={css.btn} onClick={() => {
                    setloding(true)
                    topProduct()
                }
                }>Serahe</button>

            </div>
            {Loading === true ? <Spiner /> : <Container fluid>
                <Row xs={2} sm={3} lg={4} xxl={5}>
                    {data3.map((e: any, index: number) =>
                        <Col className=" p-1" key={index}>
                            <div className='m-0'>
                                <p>{e.count}</p>
                                {e.shirts_product !== undefined && <Card  {...e.shirts_product} />}
                                {e.pants_product !== undefined && <Card  {...e.pants_product} />}
                                {e.shoes_product !== undefined && <Card  {...e.shoes_product} />}
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>}
        </>
    )
}

export default Topproduct