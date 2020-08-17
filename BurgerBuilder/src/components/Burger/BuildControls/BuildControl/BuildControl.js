import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.label}>{props.label}</div>
        <button className={classes.More} 
        onClick={props.removed} 
        disabled={props.disabled}>Remove</button>

        <button className={classes.Less} onClick={props.added}>Add</button>
    </div>
);

export default buildControl;