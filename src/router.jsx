import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//  import {browserHistory} from 'react-router';
import Login from './routes/Login';
import App from './routes/App';
import HomePage from './routes/HomePage';
import SAM from './routes/SAM';
import TreePage from './routes/TreePage';
import TablePage from './routes/TablePage';

export default function RouterConfig() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <App>
                    <Switch>
                        <Route path="/sam" exact component={SAM} />
                        <Route path="/home" exact component={HomePage} />
                        <Route path="/treepage" exact component={TreePage} />
                        <Route path="/tablepage" exact component={TablePage} />
                    </Switch>
                </App>
            </Switch>
        </BrowserRouter>
    );
}
