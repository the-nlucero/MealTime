import React, {useContext, useState} from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import styles from './Cart.module.css';

function Cart(props){

const [isCheckout, setIsCheckout] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [didSubmit, setDidSubmit] = useState(false);



const cartCtx = useContext(CartContext);

const totalAmount =`$${cartCtx.totalAmount.toFixed(2)}`;
const hasItems = cartCtx.items.length > 0;

function cartItemRemoveHandler(id){
    cartCtx.removeItem(id);
}

function cartItemAddHandler(item){
    cartCtx.addItem({...item, amount:1});
}

function orderHandler(){
    setIsSubmitting()
    setIsCheckout(true);
}

const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('ADD_YOUR_OWN_GOOGLE_REALTIME_FIREBASE_URL_HERE/orders.json', 
{
            method: 'POST',
            body: JSON.stringify(
                {
                    user: userData,
                    orderedItems: cartCtx.items,
                }),
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
}


const cartItems = (
    <ul className={styles['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );


const modalActions = (
        <div className={styles.actions}> 
            <button 
                className={styles['button--alt']} 
                onClick={props.onClose}> 
                 Close 
            </button>
            {hasItems && (
                <button 
                    className={styles.button} 
                    onClick={orderHandler}> 
                    Checkout 
                </button>)}
        </div>
);

const cartModalContent = (
<React.Fragment> 
    {cartItems}
    <div className={styles.total}> 
        <span> Total Amount </span>
        <span> {totalAmount} </span>
    </div>

    {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
    {!isCheckout && modalActions}
</React.Fragment>
);

const isSubmittingModalContent = (
    <p>Sending Order Data</p>
);

const didSubmitModalContent = (
    <React.Fragment> 
        <p>Successfully Sent The Order!</p>
        <div className={styles.actions}> 
            <button 
                className={styles.button} 
                onClick={props.onClose}> 
                 Close 
            </button>    
        </div>
    </React.Fragment>
);

    return(
        <Modal onClose={props.onClose}> 
            {!isSubmitting && !didSubmit && cartModalContent}

            {!isSubmitting && didSubmit && didSubmitModalContent}

            {isSubmitting && isSubmittingModalContent}
        </Modal>
    );
}

export default Cart;