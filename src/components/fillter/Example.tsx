import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../app/hooks';
import css from './css.module.scss'
import Form from 'react-bootstrap/Form';
import { colourOptions, SizeOptions, SizeOptions2, stylelableOption, categorys4, categorys3, categorys2, categorys, brands, sort, limet } from '../../arrays/list'
import { addItem } from '../../features/cards/fillter';
// import Example from './Example';
function Example(props: { name: string }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);

    let Dispatch = useAppDispatch()
    const [sort1, setsort1] = useState(-1);
    const [limet1, setlimet1] = useState(10);
    const [color, setcolor] = useState<string[]>([]);
    const [sizes, setsizes] = useState<string[]>([]);
    const [category, setcategorys] = useState<string[]>([]);
    const [categorysPrimere, setcategorysPrimere] = useState<string[]>([]);

    const [brandss, setbrands] = useState<string[]>([]);
    console.log({ colors: color, sizes: sizes, categorys2: category, categorys: categorysPrimere, brands: brandss, limet: limet1, sort: sort1 });

    useEffect(() => {
        Dispatch(addItem({ name: props.name, item: { colors: color, sizes: sizes, categorys2: category, categorys: categorysPrimere, brands: brandss, limet: limet1, sort: sort1 } }))
    }, [color, sizes, category, categorysPrimere, brandss]);

    return (
        <>

            <Button variant="primary" onClick={handleShow}>
                Launch
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Button
                        onClick={() => setOpen1(!open1)}
                        aria-controls="example-collapse-text-1"
                        aria-expanded={open1}
                    >
                        Button 1
                    </Button>
                    <Collapse in={open1}>
                        <div id="example-collapse-text-1">
                            {categorys.map((e) => (
                                <Form.Check
                                    inline
                                    label={e.label}
                                    onChange={() => {
                                        let index = categorysPrimere.findIndex((val) => val === e.value)
                                        if (index === -1) { setcategorysPrimere([...categorysPrimere, e.value]) }
                                        else {
                                            let arr: string[] = []
                                            categorysPrimere.map((val) => {
                                                if (val !== e.value) { arr.push(val) }
                                            })
                                            setcategorysPrimere(arr)
                                        }
                                    }} />

                            ))}
                        </div>
                    </Collapse>
                    <br />
                    <br />
                    <Button
                        onClick={() => setOpen2(!open2)}
                        aria-controls="example-collapse-text-2"
                        aria-expanded={open2}
                    >
                        Button 2
                    </Button>
                    <Collapse in={open2}>
                        <div id="example-collapse-text-2">
                            {[...categorys4, ...categorys3, ...categorys2].map((e) => (
                                <Form.Check
                                    inline
                                    label={e.label}
                                    onChange={() => {
                                        let index = category.findIndex((val) => val === e.value)
                                        if (index === -1) { setcategorys((arr) => [...arr, e.value]) }
                                        else {
                                            let arr: string[] = [...category]
                                            arr.splice(index, 1)
                                            setcategorys([...arr])
                                        }
                                    }} />

                            ))}
                        </div>
                    </Collapse>
                    <br />
                    <br />

                    <Button
                        onClick={() => setOpen3(!open3)}
                        aria-controls="example-collapse-text-3"
                        aria-expanded={open3}
                    >
                        Button 3
                    </Button>
                    <Collapse in={open3}>
                        <div id="example-collapse-text-3">
                            {brands.map((e) => (
                                <Form.Check
                                    inline
                                    checked={sizes.findIndex((val) => val === e.value) !== -1 && true}
                                    label={e.label}
                                    onChange={() => {
                                        let index = sizes.findIndex((val) => val === e.value)
                                        if (index === -1) { setsizes((arr) => [...arr, e.value]) }
                                        else {
                                            let arr: string[] = [...sizes]
                                            arr.splice(index, 1)
                                            setsizes([...arr])
                                        }
                                    }} />

                            ))}
                        </div>
                    </Collapse>
                    <br />
                    <br />

                    <Button
                        onClick={() => setOpen4(!open4)}
                        aria-controls="example-collapse-text-4"
                        aria-expanded={open4}
                    >
                        Button 4
                    </Button>
                    <Collapse in={open4}>
                        <div id="example-collapse-text-4">
                            {[...SizeOptions, ...SizeOptions2].map((e) => (
                                <Form.Check
                                    inline
                                    label={e.label}
                                    onChange={() => {
                                        let index = brandss.findIndex((val) => val === e.value)
                                        if (index === -1) { setbrands((arr) => [...arr, e.value]) }
                                        else {
                                            let arr: string[] = [...brandss]
                                            arr.splice(index, 1)
                                            setbrands([...arr])
                                        }
                                    }} />

                            ))}                        </div>
                    </Collapse>
                    <br />
                    <br />

                    <Button
                        onClick={() => setOpen5(!open5)}
                        aria-controls="example-collapse-text-5"
                        aria-expanded={open5}
                    >
                        Button 5
                    </Button>
                    <Collapse in={open5}>
                        <div id="example-collapse-text-5">
                            {colourOptions.map((e) => (
                                <Form.Check
                                    inline
                                    label={e.label}
                                    onChange={() => {
                                        let index = color.findIndex((val) => val === e.value)
                                        if (index === -1) { setcolor((arr) => [...arr, e.value]) }
                                        else {
                                            let arr: string[] = [...color]
                                            arr.splice(index, 1)
                                            setcolor([...arr])
                                        }
                                    }} />

                            ))}                           </div>
                    </Collapse>
                </Offcanvas.Body>
            </Offcanvas>

        </>
    );
}

export default Example;
