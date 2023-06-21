import React, { useEffect } from 'react';
import './App.css';
import MyNavbar from './components/Navbar2/Navbar/Navbar';
import MyNavbar2 from './components/navbar/Navbar';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Mycart from './pages/mycart/Mycart';
import Cardlist from './pages/Homepage/Cardlist';
import Page from './pages/pagecard/Page';
import Editpage from './pages/addproduct/Addproduct';
import Bootstrapform from './pages/logandsinin/Bootstrapform';
import Shose from './pages/Listarray/Shose';
import Pants from './pages/Listarray/Pants';
import Shirt from './pages/Listarray/shirts';
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
import Buttom from './components/buttom/Buttom';
import Notfoud from './components/404/Notfoud';
import { Data } from './pages/datadetsles/Data';
import Users from './pages/users/Users';
import ForgotPassword from './pages/logandsinin/ForgotPassword';
import { AddArr } from './features/cards/mycart';
import Restartpassword from './pages/logandsinin/Restartpassword';
import Changepasword2 from './pages/changepasword/Changepasword';
import Brandslist from './pages/Brandslist/Brandslist';
import Brands from './pages/brands/Brands';
import Favorites from './pages/favorites/Favorites';
import { addItems } from './features/cards/favorites';
import { Url } from './arrays/list';
import ChatGPTExample from './components/chatgbt/Chatgbt';
import Navbae2 from './components/navbar/Navbar2';
function App() {
  let { roles } = useAppSelector(e => e.user)
  let Dispatch = useAppDispatch()

  async function start() {
    const myData: any = localStorage.getItem("userdetalis");
    const cart: any = localStorage.getItem("cart");
    const Favorites: any = localStorage.getItem("Favorites");

    if (cart !== null && cart !== undefined) {
      Dispatch(AddArr(JSON.parse(cart)))
    }
    if (Favorites !== null && Favorites !== undefined) {
      Dispatch(addItems(JSON.parse(Favorites)))
    }
    const cart2: any = JSON.parse(myData);
    Dispatch(fetchUsers())
    Dispatch(fetchUsers2())
    Dispatch(fetchUsers3())

    if (myData !== null && myData !== undefined) {
      Dispatch(updatedetalise(cart2))
      axios.post(`${Url}api/auth/valtoken`, { params: { accessToken: cart2.accessToken } }).then((response) => {
        console.log(response);

        Dispatch(updatedetalise(response.data))
        if (response.data.favorite[0].products.length !== 0) {
          Dispatch(addItems(response.data.favorite[0].products))
        }
      }).catch(e => {
        console.log(e);
        Dispatch(updatedetalise({
          accessToken: cart2.accessToken,
          email: cart2.email,
          id: cart2.id,
          roles: ['user'],
          username: cart2.username
        }))

      })
    }
  }
  useEffect(() => {
    start()
  }, []);

  return (
    <>
      {/* <Navbae2 /> */}
      {/* <br /> */}
      {/* <br /> */}

      {/* <MyNavbar /> */}
      <MyNavbar2 />
      {/* <ChatComponent /> */}
      {/* <ChatGPTExample /> */}
      {/* <button onClick={() => {
        axios.get(`${Url}email/ahmad`, {
        }).then((response) => {
          console.log(response.data);
        }).catch(e => {
          console.log(e);

        })
      }}>ahmad</button> */}
      <Routes >
        <Route path='/' element={<Cardlist />} />
        <Route path='/connection' element={<Bootstrapform />} >
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='ForgotPassword' element={<ForgotPassword />} />
          <Route path='Restartpassword' element={<Restartpassword />} />
        </Route>
        <Route path='/pasword/token/:token' element={<Changepasword2 />} />
        <Route path='/Brands' element={<Brands />} />
        <Route path='/Favorites' element={<Favorites />} />
        <Route path='/Brands/:Brands' element={<Brandslist />} />
        <Route path='/about' element={<About />} />
        <Route path='/Mycard' element={<Mycart />} />
        <Route path='/shoes' element={<Shose />} />
        <Route path='/Shirts' element={<Shirt />} />
        <Route path='/pants' element={<Pants />} />
        <Route path='/:fcategory/:id' element={<Page />} />
        {roles[0] === 'admin' && <>
          <Route path='/addproduct' element={<Editpage />} />
          <Route path='/data' element={<Data />} />
          <Route path='/orders' element={<Order />} />
          <Route path='/orders/detales/:id' element={<Orderdetales />} />
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
