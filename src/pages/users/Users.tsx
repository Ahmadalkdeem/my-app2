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
import User from '../../components/user/User';
const Users = () => {

    let Dispatch = useAppDispatch()
    const { users } = useAppSelector((s) => s.users);
    console.log(users);

    const { accessToken } = useAppSelector((s) => s.user);

    function getdata() {
        axios.get(`http://localhost:3001/api/auth/users/${accessToken}/${users.length}`, {
        }).then((response) => {
            Dispatch(addItems(response.data))
            console.log(response.data);
        }).catch((err: any) => {
            console.log(err);
            console.log(err.response.data.error);
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        getdata()
    }, []);
    return (
        <>
            <User />
            {users.length === 0 ? <Spiner /> :
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
                            {users.map((user: any, i: number) =>
                                <tr key={i}>
                                    <th scope='row'>{i + 1}</th>
                                    <td className='d-flex'><FiDelete onClick={() => {
                                        Swal.fire({
                                            title: 'האם אתה רוצה למחוק את המשתמש?',
                                            showCancelButton: true,
                                            confirmButtonText: 'Save',
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                axios.delete(`http://localhost:3001/api/auth/users/${user._id}/${accessToken}`, {
                                                }).then((response) => {
                                                    console.log(response);

                                                    if (response.data.Message === "susces") {
                                                        Dispatch(delteItem(user._id))
                                                        //delteItem
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
                                                    axios.put(`http://localhost:3001/api/auth/users/user/${user._id}/${accessToken}`, {
                                                    }).then((response) => {

                                                        if (response.data.Message === 'susces') {
                                                            console.log(response);
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
                                                    axios.put(`http://localhost:3001/api/auth/users/admin/${user._id}/${accessToken}`, {
                                                    }).then((response) => {
                                                        if (response.data.Message === 'susces') {
                                                            console.log(response);
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