import React from 'react';

import './MainFooter.css';
import {TxtRegular} from "../../shared/typography/txtRegular/TxtRegular";

export const MainFooter = () => {
    return (
        <footer className={'mainFooter'}>
            <div className={'mainFooter__content'}>
                <TxtRegular className={'mainFooter__content__copyrights'}>
                    <>© <a href="mailto:bart.maczkowski@gmail.com">WEBart Bartosz
                        Mączkowski</a> {new Date().getFullYear()}</>
                </TxtRegular>
            </div>
        </footer>
    )
}