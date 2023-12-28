import React, {useCallback} from 'react';
import './FilledButton.css';

export const FilledButton = ({children, onClick, className = '', ...attrs}) => {
    const handleOnClick = useCallback((e) => {
        e.preventDefault();
        onClick();
    }, [onClick]);

    return (
        <button
            onClick={handleOnClick}
            className={`filledButton ${className}`}
            {...attrs}
        >
            {children}
        </button>
    )
}