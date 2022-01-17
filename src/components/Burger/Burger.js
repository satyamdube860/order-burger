import React from 'react';
import classes from './Burger.css'; 
import BurgerIngredent from './BurgerIngredent/BurgerIngredent'
const burger = (props) => {
    console.log(props)
    let transformedIngredents = Object.keys(props.ingredents).map(igKey => (
      // eslint-disable-next-line max-len,react/no-array-index-key
      [...Array(props.ingredents[igKey])].map((_, i) => <BurgerIngredent key={igKey + i} type={igKey} />)
    )).reduce((arr, el) => (
      arr.concat(el)
    ), []);
  
    if (transformedIngredents.length === 0) {
      transformedIngredents = <p>Please add some ingredients!</p>;
    }
    console.log(transformedIngredents);
 return(
    <div className = {classes.Burger}>
<BurgerIngredent type ="bread-top"/>
{transformedIngredents}
<BurgerIngredent type ="bread-bottom"/>
    </div>
);
};

export default burger;