import React from 'react';
import './TxtBigger.css';

export const TxtBigger = ({children, className = '', ...attrs}) => {
    return <p className={`txtBigger ${className}`} {...attrs} >{children}</p>;
}