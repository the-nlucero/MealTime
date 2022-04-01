import React from 'react';
import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import styles from './Header.module.css';

function Header(props){
    return(
        <React.Fragment>
            <header className={styles.header}> 
                <h1> MealTime </h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={styles['main-image']}> 
                <img src={mealsImage} alt='A table full of delicious food!'/>
            </div>
        </React.Fragment>
    );
}

export default Header;