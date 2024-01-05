import React from 'react';
import './TxtRegular.css';

export const TxtRegular = ({children, className = '', ...attrs}) => {
    return <p className={`txtRegular ${className}`} {...attrs} >{children}</p>;
}