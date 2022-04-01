import React, {useContext} from 'react';
import MealItemForm from './MealsItemForm';
import CartContext from '../../../store/cart-context';
import styles from './MealItem.module.css';



function MealItem(props){
    const price = `$${props.price.toFixed(2)}`; // two decimal places
    const cartCtx = useContext(CartContext);

function addToCartHandler(amount){
    cartCtx.addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price
    })
    
}
    return(
        <li className={styles.meal}>
            <div>
                <h3>{props.name}</h3> 
                <div className={styles.description}> {props.description} </div>
                <div className={styles.price}> {price} </div>
            </div>
            <div> 
                <MealItemForm onAddToCart={addToCartHandler}/>
            </div>
        </li>
    );
}

export default MealItem;