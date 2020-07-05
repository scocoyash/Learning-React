import React from 'react';

const userInput = (props) => {
    return (
        <div>
            Your Name: 
            <input type="text" onChange={props.onChange} value={props.currentName}>

            </input>
        </div>
    );
};

export default userInput;