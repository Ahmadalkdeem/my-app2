import { useEffect } from 'react'
import axios from 'axios'
import css from './css.module.scss'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Spiner from '../../components/Spiner/Spiner'
import { addItems, delteItem, updateItem } from '../../features/cards/users';
import { FiDelete, FiChevronsDown } from "react-icons/fi";
import { GiUpgrade } from "react-icons/gi";
import Swal from 'sweetalert2';
import User from '../../components/item/User';
import { Url } from '../../arrays/list';
const Users = () => {
    window.onscroll = () => { }
    let Dispatch = useAppDispatch()
    const { arr } = useAppSelector((s) => s.users);
    const { accessToken } = useAppSelector((s) => s.user);
    function getdata() {
        axios.get(`${Url}users`, { params: { skip: arr.length, accessToken: accessToken } }).then((response) => {
            Dispatch(addItems(response.data))
            if (response.data.length === 0) { alert('אין יותר משתמשים') }
        }).catch((err: any) => {
            console.log(err);
            console.log(err.response.data.error);
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        if (arr.length === 0) getdata()

    }, []);
    return (
        <>
            <User />
            {arr.length === 0 ? <Spiner /> :
                <div className={css.Div}>

                    <MDBTable className={css.table}>
                        <MDBTableHead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>delate</th>
                                <th scope='col'>update</th>
                                <th scope='col'>fullname</th>
                                <th scope='col'>email</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {arr.map((user, i: number) =>
                                <tr key={i}>
                                    <th scope='row'>{i + 1}</th>
                                    <td className='d-flex'><FiDelete onClick={() => {
                                        Swal.fire({
                                            title: 'האם אתה רוצה למחוק את המשתמש?',
                                            showCancelButton: true,
                                            confirmButtonText: 'Save',
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                axios.delete(`${Url}users`, { params: { email: user.email, accessToken: accessToken } }).then((response) => {

                                                    if (response.data.Message === "susces") {
                                                        Dispatch(delteItem(user._id))
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title: 'המשתמש נמחק בהצלחה',
                                                            showConfirmButton: false,
                                                            timer: 1500
                                                        })
                                                    }

                                                }).catch((err: any) => {
                                                    console.log(err);
                                                    console.log(err.response.data.error);
                                                })
                                            } else if (result.isDenied) {
                                                Swal.fire('המשתמש לא נמחק בהצלחה', '', 'info')
                                            }
                                        })
                                    }} className={css.icon} size={30} /> </td>
                                    {user.roles[0] === 'admin' ? <td><FiChevronsDown color='red' className={css.icon} size={30}
                                        onClick={() => {
                                            Swal.fire({
                                                title: 'האם אתה רוצה להחזיר את המשתמש כמשתמש רגיל?',
                                                showCancelButton: true,
                                                confirmButtonText: 'Save',
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    axios.put(`${Url}users/user`, { params: { id: user._id, accessToken: accessToken } }).then((response) => {

                                                        if (response.data.Message === 'susces') {
                                                            Dispatch(updateItem({ _id: user._id, roles: ['user'] }))
                                                            Swal.fire({
                                                                icon: 'success',
                                                                title: 'המשתמש הוגדר כמשתמש רגיל בהצלחה',
                                                                showConfirmButton: false,
                                                                timer: 1500
                                                            })
                                                        }

                                                    }).catch((err: any) => {
                                                        console.log(err);
                                                        console.log(err.response.data.error);
                                                    })
                                                } else if (result.isDenied) {
                                                    Swal.fire('הפעולה נכשלה', '', 'info')
                                                }
                                            })
                                        }}
                                    /></td> : <td><GiUpgrade color='green' className={css.icon} size={30}
                                        onClick={() => {
                                            Swal.fire({
                                                title: 'האם אתה רוצה להגדיר את המשתמש כמנהל?',
                                                showCancelButton: true,
                                                confirmButtonText: 'Save',
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    axios.put(`${Url}users/admin`, { params: { id: user._id, accessToken: accessToken } }).then((response) => {
                                                        if (response.data.Message === 'susces') {
                                                            Dispatch(updateItem({ _id: user._id, roles: ['admin'] }))
                                                            Swal.fire({
                                                                icon: 'success',
                                                                title: 'המשתמש הוגדר כמנהל בהצלחה',
                                                                showConfirmButton: false,
                                                                timer: 1500
                                                            })
                                                        }

                                                    }).catch((err: any) => {
                                                        console.log(err);
                                                        console.log(err.response.data.error);
                                                    })
                                                } else if (result.isDenied) {
                                                    Swal.fire('הפעולה נכשלה', '', 'info')
                                                }
                                            })
                                        }}
                                    /></td>}

                                    <td> {user.username}</td>
                                    <td> {user.email}</td>
                                </tr>
                            )}
                        </MDBTableBody>
                    </MDBTable>
                    <input className='btn btn-primary m-1 pt-1' type="button" value="more users" onClick={getdata} />
                </div>
            }
        </>
    )
}

export default Users