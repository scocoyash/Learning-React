import React from 'react';

const userOutput = (props) => {
    return (
        <div>
            <p onClick={props.onClick}> Hey, {props.name}! Welcome to React :)</p>
        </div>
    );
};

export default userOutput;