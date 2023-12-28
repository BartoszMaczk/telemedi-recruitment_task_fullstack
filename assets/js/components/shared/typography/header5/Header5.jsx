import React from 'react';
import './Header5.css';

export const Header5 = ({children, className = '', ...attrs}) => {
    return <h5 className={`header5 ${className}`} {...attrs} >{children}</h5>;
}