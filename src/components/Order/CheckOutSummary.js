import React from 'react';
import Burger from './../Burger/Burger';
import Button from './../UI/Button/Button';
import classes from './CheckOutSummary.css';

const CheckOutSummary = (props) =>{
return(
    <div className ={classes.CheckOutSummary}>
        <h1>We Hope it taste goood. </h1>
        <div style ={{width:'100%',margin:'auto'}}>
        <Burger ingredents ={props.ingredents}/>
        </div>
        <Button btnType ="Danger" clicked = {props.checkoutCancelled}
         >CANCEL</Button>
        <Button btnType ="Success" clicked = {props.checkoutContinued}
        >CONTINUE</Button>

    </div>
);
}
export default CheckOutSummary;