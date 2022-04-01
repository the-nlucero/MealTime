import React from 'react';
import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';
import Card from '../UI/Card';

//Renders Meals List
function Meals(){
    return(
        <React.Fragment>
        <Card>
            <MealsSummary />
            <AvailableMeals />
        </Card>
        </React.Fragment>
    );
}

export default Meals;