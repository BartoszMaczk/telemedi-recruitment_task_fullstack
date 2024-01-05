import React from 'react';
import './Header1.css';

export const Header1 = ({children, className = '', ...attrs}) => {
    return <h1 className={`header1 ${className}`} {...attrs} >{children}</h1>;
}