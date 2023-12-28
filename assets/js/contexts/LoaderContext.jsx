import React, {createContext, useState} from 'react';

export const LoaderContext = createContext();

export const LoaderProvider = ({children}) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoaderContext.Provider
            value={{
                loading,
                showLoader: () => setLoading(true),
                hideLoader: () => setLoading(false)
            }}
        >
            {children}
        </LoaderContext.Provider>
    );
};