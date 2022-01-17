import React from 'react';
import classes from './BuildControl.css';

const buildcontrol = (props) => (
    <div className = {classes.BuildControl}>

        <div className = {classes.lable}>{props.lable}</div>
        <button className = {classes.Less}
         onClick={props.removed} disabled ={props.disabled}>less</button>
        <button className = {classes.More}
         onClick = {props.added}>more</button>
    </div>
);
export default buildcontrol;