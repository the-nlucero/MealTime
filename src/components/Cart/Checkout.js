import React, {useRef, useState} from 'react';
import styles from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const validPostal = value => value.trim().length === 5;

const Checkout = (props) => {

    const [formInputsValidity, setFormInputsValidity] = useState(
        {
            name: true,
            street: true,
            city: true,
            postalCode: true 
        });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();





const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = validPostal(enteredPostal);


    setFormInputsValidity(
    {
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalIsValid 
    });

    const formIsValid = 
           enteredNameIsValid 
        && enteredCityIsValid 
        && enteredPostalIsValid
        && enteredStreetIsValid;
    
    if(!formIsValid){
        return;
    }


    //Submit Cart Data
    props.onConfirm(
        {
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostal
        }
    );

};


const nameErrorStyle = `${styles.control} ${formInputsValidity.name ? '' : styles.invalid}`;
const streetErrorStyle = `${styles.control} ${formInputsValidity.street ? '' : styles.invalid}`;
const postalErrorStyle = `${styles.control} ${formInputsValidity.postalCode ? '' : styles.invalid}`;
const cityErrorStyle = `${styles.control} ${formInputsValidity.city ? '' : styles.invalid}`;


  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      
      <div className={nameErrorStyle}>
        <label htmlFor='name'>Your Name</label>
        <input 
            type='text' 
            id='name' 
            ref={nameInputRef}
        />
        {!formInputsValidity.name && <p>Please Enter A Valid Name!</p>}
      </div>


      <div className={streetErrorStyle}>
        <label htmlFor='street'>Street</label>
        <input 
            type='text' 
            id='street' 
            ref={streetInputRef}
        /> 
        {!formInputsValidity.street && <p>Please Enter A Valid Street!</p>}
      </div>


      <div className={postalErrorStyle}>
        <label htmlFor='postal'>Postal Code</label>
        <input 
            type='text' 
            id='postal' 
            ref={postalInputRef}
        />
        {!formInputsValidity.postalCode && <p>Please Enter A Valid Post Code! (5 Integers Only)</p>}
      </div>

      <div className={cityErrorStyle}>
        <label htmlFor='city'>City</label>
        <input 
            type='text' 
            id='city' 
            ref={cityInputRef}
        />
        {!formInputsValidity.city && <p>Please Enter A Valid City!</p>}
      </div>
      
      <div className={styles.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Place Order</button>
      </div>


    </form>
  );
};

export default Checkout;