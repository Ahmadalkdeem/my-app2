import React, { useEffect } from 'react';
import './App.css';
import MyNavbar from './components/Navbar2/Navbar/Navbar';
import MyNavbar2 from './components/navbar/Navbar';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Mycart from './pages/mycart/Mycart';
import Cardlist from './pages/Homepage/Cardlist';
import Page from './pages/pagecard/Page';
import Editpage from './pages/Editpage/Editpage ';
import Bootstrapform from './pages/logandsinin/Bootstrapform';
import Shose from './pages/shoselist/Shose';
import Pants from './pages/pantslist/Pants';
import Shirt from './pages/Shirtslist/shirts';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUsers } from './features/cards/cardshirts';
import { fetchUsers2 } from './features/cards/cardPants';
import { fetchUsers3 } from './features/cards/cardshose';
import About from './pages/about/About';
import Footer from './components/footer/Footer';
import Editeproduct from './pages/Editeproduct/Editeproduct';
import Order from './pages/orders/Order';
import Orderdetales from './pages/orderdetales/Orderdetales';
import Login from './pages/logandsinin/Login';
import Signup from './pages/logandsinin/Signup';
import { updatedetalise } from './features/user/user';
import OffcanvasExample from './components/navbar/Navbar';
import Buttom from './components/buttom/Buttom';
import Notfoud from './components/404/Notfoud';
import { Data } from './pages/datadetsles/Data';
import Users from './pages/users/Users';
import ForgotPassword from './pages/logandsinin/ForgotPassword';
import { AddArr } from './features/cards/mycart';
import Restartpassword from './pages/logandsinin/Restartpassword';
function App() {
  let { email, roles, username, accessToken } = useAppSelector(e => e.user)
  let Dispatch = useAppDispatch()

  async function start() {
    const myData: any = localStorage.getItem("userdetalis");
    const cart: any = localStorage.getItem("cart");
    Dispatch(AddArr(JSON.parse(cart)))
    Dispatch(fetchUsers())
    Dispatch(fetchUsers2())
    Dispatch(fetchUsers3())

    if (myData !== null && myData !== undefined) {
      axios.post(`http://localhost:3001/api/auth/valtoken`, {
        token: myData
      }).then((response) => {
        console.log(response);

        Dispatch(updatedetalise(response.data))
      }).catch(e => {
        console.log(e);

      })
    }
  }
  useEffect(() => {
    start()
  }, []);

  return (
    <>
      <MyNavbar2 />
      <MyNavbar />
      <button onClick={() => {
        axios.get(`http://localhost:3001/email/ahmad`, {
        }).then((response) => {
          console.log(response.data);
        }).catch(e => {
          console.log(e);

        })
      }}>ahmad</button>
      <Routes >
        <Route path='/' element={<Cardlist />} />
        <Route path='/home' element={<Cardlist />} />
        <Route path='/connection' element={<Bootstrapform />} >
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='ForgotPassword' element={<ForgotPassword />} />
          <Route path='Restartpassword' element={<Restartpassword />} />
        </Route>
        <Route path='/about' element={<About />} />
        <Route path='/shoes' element={<Shose />} />
        <Route path='/Mycard' element={<Mycart />} />
        <Route path='/Shirts' element={<Shirt />} />
        <Route path='/pants' element={<Pants />} />
        <Route path='/:fcategory/:scategory/:id' element={<Page />} />
        {roles[0] === 'admin' && <>
          <Route path='/addproduct' element={<Editpage />} />
          <Route path='/data' element={<Data />} />
          <Route path='/orders' element={<Order />} />
          <Route path='/orders/detales/:id2' element={<Orderdetales />} />
          <Route path='/Editeproduct/:category/:id' element={<Editeproduct />} />
          <Route path='/users' element={<Users />} />
        </>
        }
        <Route path='*' element={<Notfoud />} />
      </Routes>
      <Buttom />

      <Footer />
    </>
  );
}

export default App;
