import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import '../css/app.css';
import {DefaultLayout} from "./components/layouts/default/DefaultLayout";
import {Home} from './components/pages/Home';
import {ExchangeRates} from "./components/pages/ExchangeRates";

ReactDOM.render(
    <Router>
        <Switch>
            <DefaultLayout>
                <Route path="/" component={Home}/>
                <Route path="/kursy-walut" component={ExchangeRates}/>
            </DefaultLayout>
        </Switch>
    </Router>, document.getElementById('root')
);

