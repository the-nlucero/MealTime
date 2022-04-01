import React, {useState} from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {

const [cartIsshown, setCartIsShown] = useState(false);

function showCartHandler(){
  setCartIsShown(true);
}

function hideCartHandler(){
  setCartIsShown(false);
}

  return (
    <CartProvider>
      {cartIsshown && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      
      <main>
        <Meals />
      </main>

    </CartProvider>
  );
}

export default App;
