import { useEffect } from 'react'
import Select from 'react-select'
import { useState } from 'react'
import axios from 'axios';
import css from './css.module.scss'
import { useNavigate } from 'react-router-dom';
import { AiOutlineUpload } from "react-icons/ai";
import { optionstype } from '../../@types/Mytypes';
import { SizeOptions, brands, SizeOptions2, categorys3, categorys4, stylelableOption, categorys2, categorys, colourOptions, Url, } from '../../arrays/list'
import { useAppSelector } from '../../app/hooks';
import Swall from '../../components/swal/Swal';

function Editpage() {
    window.onscroll = () => { }
    let Navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [opsions, setopsions] = useState<any>([])
    const [error, seterror] = useState<string[]>([])
    const [photo7, setphoto7] = useState<any>([])
    const [description, setdescription] = useState('')
    const [titel, settitel] = useState('')
    const [brand, setbrand] = useState('')
    const [Permissivecategory, setPermissivecategory] = useState('')
    const [secondarycategory, setsecondarycategory] = useState('')
    const [saleprice, setsaleprice] = useState('')
    const [regularprice, setregularprice] = useState('')
    const [fcolourOptions, setfcolourOptions] = useState<optionstype[]>([])
    const [fSizeOptions2, setSizeOptions2] = useState<any>([])
    const { accessToken } = useAppSelector((s) => s.user);

    useEffect(() => {
        if (Permissivecategory === 'pants') {
            setopsions(categorys2)
        }
        if (Permissivecategory === 'Shirts') {
            setopsions(categorys3)
        }
        if (Permissivecategory === 'shoes') {
            setopsions(categorys4)
        }
    }, [Permissivecategory])
    function poo(eq: any) {
        eq.forEach((ee: any) => {
            let zxc = fSizeOptions2.find((e: any) => e.size === ee.value)
            if (zxc === undefined) {
                let colors: { color: string }[] = []
                fcolourOptions.forEach((cc) => {
                    colors.push({ color: cc.value })
                })
                console.log(fSizeOptions2.find((e: any) => e.size === ee.value));
                console.log(fSizeOptions2.findIndex((e: any) => e.size === ee.value));
                setSizeOptions2((err: any) => [...err, { size: ee.value, colors: colors }])
            } else {
            }
        })
    }


    const handleSaveCardClicked = async () => {
        let errors: string[] = []
        if (Permissivecategory.length === 0) errors.push('תבחר כתוגרי ראשית')
        if (secondarycategory.length === 0) errors.push('תבחר כתוגרי משנית')
        if (brand.length === 0) errors.push('תבחר חברה')
        if (titel.length === 0) errors.push('תכתוב כותרת')
        if (saleprice.length === 0) errors.push('תכתוב מחיר מכירה')
        if (regularprice.length === 0) errors.push('תכתוב מחיר רגיל')
        if (fSizeOptions2.length === 0) errors.push('תבחר מידות ו צבעים')
        if (description.length < 11) errors.push('תכתוב תיאור')
        if (photo7.length === 0) errors.push('תעלה תמונות')
        seterror(errors)
        if (description.length > 0 && titel.length > 0 && brand.length > 0 && Permissivecategory.length > 0 && secondarycategory.length > 0 && saleprice.length > 0 && regularprice.length > 0 && fSizeOptions2.length > 0 && photo7.length > 0) {
            Savecard()
        }
    }
    const Savecard = async () => {
        const formData = new FormData()
        for (let i = 0; i < 8; i++) {
            formData.append('profileImg', photo7[i])
        }

        formData.append('setPermissivecategory', Permissivecategory)
        formData.append('categoryselect2', secondarycategory)
        formData.append('titel', titel)
        formData.append('brand', brand)
        formData.append('description', description)
        formData.append('saleprice', saleprice)
        formData.append('regularprice', regularprice)
        formData.append('fSizeOptions2', JSON.stringify(fSizeOptions2))
        axios.post(`${Url}uplode/user-profile/${accessToken}`, formData, {
        }).then((res: any) => {
            console.log(res.data)
            if (res.data.message === 'good') {
                Swall({ titel: 'המוצר הוסף בהצלחה', timer: 1000 })
                setTimeout(() => {
                    Navigate(-1)
                }, 1500);
            }

        }).catch((err: any) => {
            console.log(err);
            console.log(err.response.data.error);
        })
    }

    return (
        <div className={css.div}>
            <h3>הוספת מוצר:</h3>
            {error.length !== 0 && <>
                {error.map((e, i) =>
                    <p className='m-1' key={i}>{e}</p>
                )}

            </>}
            <div className="label-input d-flex flex-column">
                <Select
                    options={categorys}
                    onChange={(e: any) => {
                        console.log(e);
                        setPermissivecategory(e.value)
                    }}
                    styles={stylelableOption}

                    placeholder='קטגוריה רשית'
                />
                <br />
                <Select
                    options={opsions}
                    onChange={(e: any) => {
                        console.log(e);
                        setsecondarycategory(e.value)
                    }}
                    styles={stylelableOption}

                    placeholder='קטגוריה משנית'
                />
                <br />
                <Select
                    options={brands}
                    onChange={(e: any) => {
                        setbrand(e.value)
                    }}
                    styles={stylelableOption}

                    placeholder='שם החברה'
                />
                <br />
                <input placeholder='שם המוצר' onChange={(e) => {
                    settitel(e.target.value)
                }} className={css.input} type="text" id='titel' />
                <br />
                <input value={saleprice} placeholder='מחיר המכירה' onChange={(e: any) => {

                    if (e.target.value < 0) { }
                    else if (e.target.value[0] == 0) { }
                    else if (e.target.value.length < 7) {
                        setsaleprice(e.target.value)
                    }

                }} className={css.input} type="number" id='titel' />
                <br />
                <input value={regularprice} placeholder='מחיר הרגיל' onChange={(e: any) => {
                    if (e.target.value < 0) { }
                    else if (e.target.value[0] == 0) { }
                    else if (e.target.value.length < 7) {
                        setregularprice(e.target.value)
                    }
                }} className={css.input} type="number" id='titel' />
                <br />
                <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={colourOptions}
                    onChange={(e: any) => {
                        console.log(e);
                        setfcolourOptions(e);
                    }}
                    styles={stylelableOption}

                    placeholder='צבעים'
                />
                <br />
                <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={Permissivecategory === 'shoes' ? SizeOptions2 : SizeOptions}
                    onChange={(e: any) => {
                        poo(e)
                    }}
                    styles={stylelableOption}
                    placeholder='מידות'
                />


                <table onClick={(event) => {
                    if (event.detail === 2) {
                        setSizeOptions2([])
                    }
                }} >
                    <tbody>



                        {fSizeOptions2.map((val: any, key: number) => {
                            return (
                                <tr key={key}>
                                    <td>{val.size}</td>

                                    {val.colors.map((val2: any, key2: any) => {
                                        return (

                                            <td key={key2} className='m-2'>{val2.color}</td>

                                        )
                                    })}

                                </tr>
                            )
                        })}
                    </tbody>
                </table>


                <br />
                <textarea rows={4} id="description" onChange={(e) => {
                    setdescription(e.target.value)
                }}
                    className={css.input}
                    placeholder="description"
                />
            </div>
            <label className={css.lable} htmlFor="files">
                <AiOutlineUpload size={50} />
                <h5>תבחר תמונות</h5>
            </label>
            <input id='files' onChange={(e: any) => {
                setphoto7(e.target.files);
            }} type="file" accept=".jpg, .jpeg, .png, .svg, .gif" name="file" multiple className='d-none' />
            <br />
            <button className={css.btn} onClick={handleSaveCardClicked}>uplode</button>
        </div>
    )
}

export default Editpage 
