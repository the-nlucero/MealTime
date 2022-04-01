import React, {useContext, useEffect, useState} from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import styles from './HeaderCartButton.module.css';

function HeaderCartButton(props){
    const [btnIsHighlighted, setbtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;
    const numberOfCartItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

  
    
    const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump: ''}`;
    
    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setbtnIsHighlighted(true);
       
       const timer = setTimeout(() => {
            setbtnIsHighlighted(false); 
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={styles.icon}> 
                <CartIcon /> 
            </span>
            <span> Your Cart  </span>
            <span className={styles.badge}> {numberOfCartItems} </span>
        </button>
    );

}

export default HeaderCartButton;