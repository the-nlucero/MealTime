import React, {useReducer} from 'react'
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

function cartReducer(state, action){
    
    if(action.type === 'ADD_CART_ITEM'){
        const exsistingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const exsistingCartItem = state.items[exsistingCartItemIndex];
        
        let updatedItems;

        if(exsistingCartItem){
            const updatedItem = {
                ...exsistingCartItem,
                amount: exsistingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[exsistingCartItemIndex] = updatedItem;
        }
        else{
            updatedItems = state.items.concat(action.item);
        }
    
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
    if(action.type === 'REMOVE_CART_ITEM'){        
        const exsistingCartItemIndex = state.items.findIndex(item => item.id === action.id);
    
    const existingItem = state.items[exsistingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    
        if(existingItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        }
        else{
            const updatedItem = {...existingItem, amount: existingItem.amount -1};
            updatedItems = [...state.items];
            updatedItems[exsistingCartItemIndex] = updatedItem;

        }
        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }

    }

    // CLEAR CART ONCE ORDER IS FUFILLED
    if(action.type === 'CLEAR'){
        return defaultCartState;    
    }

    return defaultCartState;
}

function CartProvider(props){

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

function addItemToCartHandler(item){
    dispatchCartAction({
        type: 'ADD_CART_ITEM',
        item: item
    });
}

function removeItemFromCartHandler(id){
    dispatchCartAction({
        type: 'REMOVE_CART_ITEM',
        id: id
    });
}

function clearCartHandler() {
    dispatchCartAction({type: 'CLEAR'});
}


const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler ,
    clearCart: clearCartHandler
}
    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;