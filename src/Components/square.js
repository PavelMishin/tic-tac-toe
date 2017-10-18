import React from 'react';

function Square(props) {
    const classes = "square " + ((props.winSquare) ? "winning-square" : "");
    return (
        <button className={classes} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;