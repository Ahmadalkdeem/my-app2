import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import css from './css.module.scss'
import { Link } from 'react-router-dom';
import { brands2 } from '../../arrays/list';
import { brandstype } from '../../@types/Mytypes';
import H2 from '../../components/h2/H2';
const Brands = () => {
    window.onscroll = () => { }
    const [serahre, setserahre] = useState<string>('');
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className={css.div}>
            <H2 h2='מותגים' />
            <input value={serahre} onChange={(event) => setserahre(event.target.value)} className={css.input} type="text" placeholder='חיפוש...' />

            <Container fluid>
                <Row xs={2} sm={3} lg={4} xxl={5}>
                    {brands2.filter((val: brandstype) => {
                        if (serahre === '') {
                            return val
                        } else if (val.value.toLowerCase().includes(serahre.toLowerCase())) {
                            return val
                        }
                    }).map((e, i: number) =>

                        <Col key={i} className="mt-2 p-1">
                            <Link to={`/Brands/${e.value}`} > <img className={css.img} src={e.src} alt={e.value} /></Link>
                        </Col>

                    )}
                </Row>

            </Container>
            {brands2.filter((val: brandstype) => {
                if (serahre === '') {
                    return val
                } else if (val.value.toLowerCase().includes(serahre.toLowerCase())) {
                    return val
                }
            }).length === 0 && <div className={css.div2}>לא נמצאו תוצאות לחיפוש, אנא נסו שוב.</div>}
        </div>
    )
}

export default Brands