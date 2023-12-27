import React from 'react';

import './MainHeader.css';
import {Link} from "react-router-dom";
import {Image} from "../../shared/images/Image";

export const MainHeader = () => {
    return (
        <header className={'mainHeader'}>
            <div className={'mainHeader__content'}>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <Link className={"navbar-brand"} to={"/"}><Image name={'logo.webp'} dirName={'logo'} alt={'Logo'}/></Link>
                    <div id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className={"nav-link"} to={"/kursy-walut"}>Kursy walut</Link>
                            </li>

                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}