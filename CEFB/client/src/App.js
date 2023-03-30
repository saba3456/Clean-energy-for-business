import './App.css';
import './Components/CSSContents/Footer.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Home from './Components/Pages/Home';
import GymSolution from './Components/HomeContents/GymSolution';
import Courier from './Components/HomeContents/Couriers';
import BoilerBioFuel from './Components/HomeContents/BoilerBioFuel';
import Shop from './Components/Pages/Shop/Shop';
import Profile from './Components/Pages/Profile';
import ErrorPage from './Components/ErrorPage';
import NavBar from './Components/NavBar';
import Footer from './Components/Pages/Footer';
import Co2Calculator from './Components/Pages/Co2Calculator';
import AboutUs from './Components/Pages/AboutUs';
import ContactUs from './Components/Pages/ContactUs';
import Cart from './Components/Pages/Shop/Cart';
import Radar from './Components/Pages/Radar';
import BusinessChat from './Components/Pages/BusinessChat'
import Faq from './Components/Pages/Faq';
import Customer from './Components/Pages/Shop/Customer';



function App() {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (index === -1) {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    } else {
      const newCartItems = [...cartItems];
      newCartItems[index].quantity++;
      setCartItems(newCartItems);
    }
  };

  const removeFromCart = (item) => {
    const newCartItems = [...cartItems];
    const index = newCartItems.findIndex((cartItem) => cartItem.id === item.id);
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const increaseQuantity = (item) => {
    const newCartItems = [...cartItems];
    const index = newCartItems.findIndex((cartItem) => cartItem.id === item.id);
    newCartItems[index].quantity++;
    setCartItems(newCartItems);
  };

  const decreaseQuantity = (item) => {
    const newCartItems = [...cartItems];
    const index = newCartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity--;
      setCartItems(newCartItems);
    }
  };

  return (

    <div className='App'>

      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/GymSolution' element={<GymSolution />} />
          <Route path='/Courier' element={<Courier />} />
          <Route path='/BoilerBioFuel' element={<BoilerBioFuel />} />
          <Route path='/Shop' element={<Shop addToCart={addToCart} />} />
          <Route path='/cart' element={<Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/co2' element={<Co2Calculator />} />
          <Route path='/AboutUs' element={<AboutUs />} />
          <Route path='/ContactUs' element={<ContactUs />} />
          <Route path='/Radar' element={<Radar />} />
          <Route path='/BusinessChat' element={<BusinessChat />} />
          <Route path='/Faq' element={<Faq />} />
          <Route path='/Customer' element={<Customer/>} />

          <Route path='*' element={<ErrorPage />} />

        </Routes>

        <Footer />

      </Router>
    </div>

  );
}

export default App;




