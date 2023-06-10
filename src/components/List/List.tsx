import MyCard from '../card/Card'
import css from './css.module.scss'
import { Container, Row, Col } from 'react-bootstrap';
import { Cardtype } from '../../@types/Mytypes'
function List(props: { arr: Cardtype[] }) {
    return (
        <>
            <Container className={`Container ${css.Container}`} fluid>
                <Row xs={2} sm={3} lg={4} xxl={5}>
                    {props.arr.map(((product, i: number) => (
                        <Col key={i} className="mt-2 p-1">
                            <MyCard  {...product} />
                        </Col>)))}
                </Row>
            </Container>
        </>
    )
}

export default List
