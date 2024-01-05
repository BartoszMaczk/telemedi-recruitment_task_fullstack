import React, {createContext, useState} from 'react';

export const ErrorModalContext = createContext();

export const ErrorModalProvider = ({children}) => {
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const showError = (message) => {
        setErrorMessage(message);
        setShowErrorModal(true);
    }

    const hideError = () => {
        setErrorMessage('');
        setShowErrorModal(false);
    }

    return (
        <ErrorModalContext.Provider
            value={{
                showErrorModal,
                errorMessage,
                showError,
                hideError
            }}
        >
            {children}
        </ErrorModalContext.Provider>
    );
};