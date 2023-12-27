import React from "react";
import {MainHeader} from "../headers/MainHeader";
import {MainFooter} from "../footers/MainFooter";

export const DefaultLayout = ({children}) => {
    return (
        <>
            <MainHeader/>
            <main>
                {children}
            </main>
            <MainFooter/>
        </>
    );
}