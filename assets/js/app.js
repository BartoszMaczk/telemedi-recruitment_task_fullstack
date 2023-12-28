import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import '../css/app.css';
import {DefaultLayout} from "./components/layouts/default/DefaultLayout";
import {Home} from './components/pages/home/Home';
import {ExchangeRates} from "./components/pages/exchangeRates/ExchangeRates";
import {LoaderProvider} from "./contexts/LoaderContext";

ReactDOM.render(
    <LoaderProvider>
        <Router>
            <Switch>
                <Route path="/kursy-walut/:date(\d{4}-\d{2}-\d{2})?">
                    <DefaultLayout><ExchangeRates/></DefaultLayout>
                </Route>
                <Route path="/">
                    <DefaultLayout><Home/></DefaultLayout>
                </Route>
                <Route><Redirect to={"/"}/></Route>
            </Switch>
        </Router>
    </LoaderProvider>
    , document.getElementById('root')
);

