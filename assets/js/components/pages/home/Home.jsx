import React from 'react';
import {Image} from "../../shared/images/Image";
import './Home.css';
import {Header1} from "../../shared/typography/header1/Header1";
import {Header5} from "../../shared/typography/header5/Header5";
import {FilledButton} from "../../shared/buttons/filledButton/FilledButton";
import {useHistory} from "react-router-dom";

export const Home = () => {

    const history = useHistory();

    const handleClick = () => {
        history.push('/kursy-walut');
    }

    return (
        <div className={'homePage'}>
            <Image
                className={'homePage__cover'}
                name={'bg.webp'} dirName={'backgrounds'}
                alt={'man sitting on top of coins'}
            />
            <aside className={'homePage__backdrop'}/>
            <section className={'homePage__content'}>
                <Header1 className={'homePage__content__title'}>Zainwestuj z nami!</Header1>
                <Header5 className={'homePage__content__subtitle'}>Sprwadz aktualne kursy naszych walut</Header5>
                <FilledButton className={'homePage__content__button'} onClick={handleClick}>Sprawdź</FilledButton>
            </section>
        </div>
    )
}
