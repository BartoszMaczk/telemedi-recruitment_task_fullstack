import React, {useContext} from "react";
import {MainHeader} from "../headers/MainHeader";
import {MainFooter} from "../footers/MainFooter";
import {ErrorModalContext} from "../../../contexts/ErrorModalContext";
import {ErrorModal} from "../../shared/modals/errorModal/ErrorModal";

export const DefaultLayout = ({children}) => {
    const {showErrorModal, errorMessage, hideError} = useContext(ErrorModalContext);

    return (
        <>
            <MainHeader/>
            <main>
                {children}
            </main>
            <ErrorModal show={showErrorModal} message={errorMessage} onClose={hideError}/>
            <MainFooter/>
        </>
    );
}